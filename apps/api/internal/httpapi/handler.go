package httpapi

import (
	"crypto/sha256"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"time"
	"zhiyu.local/api/internal/site"
)

type Handler struct{ store site.Store }

func New(store site.Store) http.Handler {
	h := &Handler{store: store}
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", h.health)
	mux.HandleFunc("GET /v1/catalog", h.catalog)
	mux.HandleFunc("POST /v1/inquiries", h.inquiry)
	return http.TimeoutHandler(mux, 5*time.Second, `{"error":"请求超时，请重试"}`)
}
func reply(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}
func (h *Handler) health(w http.ResponseWriter, r *http.Request) {
	if err := h.store.Ping(r.Context()); err != nil {
		reply(w, 503, map[string]string{"status": "unavailable"})
		return
	}
	reply(w, 200, map[string]string{"status": "ok"})
}
func (h *Handler) catalog(w http.ResponseWriter, r *http.Request) {
	data, err := h.store.Catalog(r.Context())
	if err != nil {
		slog.Error("catalog read failed", "error", err)
		reply(w, 503, map[string]string{"error": "内容暂时不可用"})
		return
	}
	body, _ := json.Marshal(data)
	tag := fmt.Sprintf(`"%x"`, sha256.Sum256(body))
	w.Header().Set("ETag", tag)
	w.Header().Set("Cache-Control", "public, max-age=60, stale-while-revalidate=300")
	if r.Header.Get("If-None-Match") == tag {
		w.WriteHeader(http.StatusNotModified)
		return
	}
	reply(w, 200, data)
}
func (h *Handler) inquiry(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	if r.Header.Get("Content-Type") != "application/json" {
		reply(w, 415, map[string]string{"error": "请使用 JSON 提交"})
		return
	}
	key := r.Header.Get("Idempotency-Key")
	if !site.KeyPattern.MatchString(key) {
		reply(w, 400, map[string]string{"error": "缺少有效的提交标识"})
		return
	}
	var input site.Inquiry
	decoder := json.NewDecoder(http.MaxBytesReader(w, r.Body, 32768))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&input); err != nil {
		reply(w, 400, map[string]string{"error": "提交内容格式不正确"})
		return
	}
	if err := decoder.Decode(new(any)); err != io.EOF {
		reply(w, 400, map[string]string{"error": "仅允许一个 JSON 对象"})
		return
	}
	if fields := input.Validate(time.Now()); len(fields) > 0 {
		reply(w, 422, map[string]any{"error": "请检查表单内容", "fields": fields})
		return
	}
	id, err := h.store.SaveInquiry(r.Context(), key, input)
	if errors.Is(err, site.ErrConflict) {
		reply(w, 409, map[string]string{"error": "提交标识已用于其他内容，请重新提交"})
		return
	}
	if err != nil {
		slog.Error("inquiry persistence failed", "error", err)
		reply(w, 503, map[string]string{"error": "暂时无法提交，请稍后重试"})
		return
	}
	reply(w, 201, map[string]any{"id": id, "status": "received"})
}
