// Bootstrap a local administrator and index existing, publicly served image assets.
package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
	"zhiyu.local/api/internal/management"
	"zhiyu.local/api/internal/postgres"
)

func main() {
	email := flag.String("email", "admin@zhiyu.local", "administrator email")
	file := flag.String("password-file", "", "file containing initial password")
	root := flag.String("assets", "apps/web/public/images", "existing image directory")
	flag.Parse()
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()
	s, e := postgres.Open(ctx, os.Getenv("DATABASE_URL"))
	if e != nil {
		log.Fatal(e)
	}
	defer s.Close()
	if e = s.Migrate(ctx); e != nil {
		log.Fatal(e)
	}
	if *file != "" {
		b, e := os.ReadFile(*file)
		if e != nil {
			log.Fatal(e)
		}
		if e = s.BootstrapAdmin(ctx, *email, "管理员", strings.TrimSpace(string(b))); e != nil {
			log.Fatal(e)
		}
	}
	n := 0
	e = filepath.WalkDir(*root, func(p string, d os.DirEntry, e error) error {
		if e != nil {
			return e
		}
		if d.IsDir() {
			return nil
		}
		b, e := os.ReadFile(p)
		if e != nil {
			return e
		}
		mime := http.DetectContentType(b)
		if !strings.HasPrefix(mime, "image/") {
			return nil
		}
		rel, e := filepath.Rel(*root, p)
		if e != nil {
			return e
		}
		category := filepath.Dir(rel)
		if category == "." {
			category = "品牌与团队"
		}
		_, e = s.AddAsset(ctx, 0, management.Asset{Path: "/images/" + filepath.ToSlash(rel), Name: filepath.Base(p), Category: category, Mime: mime, Bytes: int64(len(b))})
		n++
		return e
	})
	if e != nil {
		log.Fatal(e)
	}
	log.Printf("administrator initialized; indexed %d images (existing records preserved)", n)
}
