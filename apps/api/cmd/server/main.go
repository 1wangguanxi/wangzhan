package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"regexp"
	"syscall"
	"time"
	"zhiyu.local/api/internal/analytics"
	"zhiyu.local/api/internal/httpapi"
	"zhiyu.local/api/internal/management"
	"zhiyu.local/api/internal/postgres"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	url := os.Getenv("DATABASE_URL")
	if url == "" {
		slog.Error("DATABASE_URL is required")
		os.Exit(1)
	}
	startup, cancel := context.WithTimeout(ctx, 10*time.Second)
	store, err := postgres.Open(startup, url)
	cancel()
	if err != nil {
		slog.Error("database unavailable", "error", err)
		os.Exit(1)
	}
	defer store.Close()
	addr := os.Getenv("API_ADDR")
	if addr == "" {
		addr = "127.0.0.1:8080"
	}
	publicDir := os.Getenv("PUBLIC_DIR")
	if publicDir == "" {
		publicDir = "apps/web/public"
	}
	uploadDir := os.Getenv("UPLOAD_DIR")
	if uploadDir == "" {
		uploadDir = ".runtime/uploads"
	}
	mux := http.NewServeMux()
	mux.Handle("/v1/admin/", management.New(store, store, publicDir, uploadDir))
	mux.Handle("/v1/events", analytics.New(store))
	mux.HandleFunc("GET /uploads/{file}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("file")
		if !regexp.MustCompile(`^[a-f0-9]{64}\.(png|jpg|webp|gif)$`).MatchString(name) {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Cache-Control", "public,max-age=31536000,immutable")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		http.ServeFile(w, r, filepath.Join(uploadDir, name))
	})
	mux.Handle("/", httpapi.New(store))
	go func() {
		ticker := time.NewTicker(24 * time.Hour)
		defer ticker.Stop()
		for {
			cleanup, cancel := context.WithTimeout(ctx, 30*time.Second)
			if e := store.PurgeAnalytics(cleanup); e != nil {
				slog.Warn("analytics retention failed", "error", e)
			}
			cancel()
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
			}
		}
	}()
	server := &http.Server{Addr: addr, Handler: mux, ReadHeaderTimeout: 3 * time.Second, ReadTimeout: 10 * time.Second, WriteTimeout: 10 * time.Second, IdleTimeout: 60 * time.Second, MaxHeaderBytes: 16 << 10}
	go func() {
		<-ctx.Done()
		shutdown, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = server.Shutdown(shutdown)
	}()
	slog.Info("API listening", "address", addr)
	if err = server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		slog.Error("server failed", "error", err)
		os.Exit(1)
	}
}
