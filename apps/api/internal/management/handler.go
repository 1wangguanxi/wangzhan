package management

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"unicode/utf8"
	"zhiyu.local/api/internal/analytics"
)

type Handler struct {
	store     Store
	metrics   analytics.Store
	publicDir string
	uploadDir string
	limiter   analytics.Limiter
}

func New(s Store, a analytics.Store, publicDir, uploadDir string) http.Handler {
	h := &Handler{store: s, metrics: a, publicDir: publicDir, uploadDir: uploadDir}
	mux := http.NewServeMux()
	mux.HandleFunc("POST /v1/admin/login", h.login)
	private := http.NewServeMux()
	private.HandleFunc("GET /v1/admin/me", func(w http.ResponseWriter, r *http.Request) {
		u, _ := s.Session(r.Context(), bearer(r))
		respond(w, 200, u)
	})
	private.HandleFunc("POST /v1/admin/logout", func(w http.ResponseWriter, r *http.Request) {
		if e := s.Logout(r.Context(), bearer(r)); e != nil {
			fail(w, e)
			return
		}
		respond(w, 200, map[string]bool{"ok": true})
	})
	private.HandleFunc("POST /v1/admin/password", h.password)
	private.HandleFunc("GET /v1/admin/analytics", func(w http.ResponseWriter, r *http.Request) {
		period := r.URL.Query().Get("period")
		if period != "24h" && period != "7d" && period != "30d" {
			respond(w, 400, map[string]string{"error": "请选择有效时间范围"})
			return
		}
		d, e := a.Dashboard(r.Context(), period)
		if e != nil {
			fail(w, e)
			return
		}
		respond(w, 200, d)
	})
	private.HandleFunc("GET /v1/admin/inquiries", func(w http.ResponseWriter, r *http.Request) {
		d, e := s.Inquiries(r.Context(), query(r))
		if e != nil {
			fail(w, e)
			return
		}
		respond(w, 200, d)
	})
	private.HandleFunc("PATCH /v1/admin/inquiries/{id}", h.updateInquiry)
	private.HandleFunc("GET /v1/admin/assets", func(w http.ResponseWriter, r *http.Request) {
		d, e := s.Assets(r.Context(), query(r))
		if e != nil {
			fail(w, e)
			return
		}
		respond(w, 200, d)
	})
	private.HandleFunc("POST /v1/admin/assets", h.upload)
	private.HandleFunc("PATCH /v1/admin/assets/{id}", h.updateAsset)
	private.HandleFunc("GET /v1/admin/assets/{id}/file", h.file)
	private.HandleFunc("GET /v1/admin/audit", func(w http.ResponseWriter, r *http.Request) {
		d, e := s.Audit(r.Context())
		if e != nil {
			fail(w, e)
			return
		}
		respond(w, 200, d)
	})
	mux.Handle("/v1/admin/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		_, e := s.Session(r.Context(), bearer(r))
		if e != nil {
			fail(w, e)
			return
		}
		private.ServeHTTP(w, r)
	}))
	return mux
}
func respond(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
func fail(w http.ResponseWriter, e error) {
	status := 503
	message := "服务暂时不可用，请稍后重试"
	switch {
	case errors.Is(e, ErrUnauthorized):
		status = 401
		message = "登录已过期或账号密码错误"
	case errors.Is(e, ErrNotFound):
		status = 404
		message = "记录不存在"
	case errors.Is(e, ErrConflict):
		status = 409
		message = "记录已被修改，请刷新后重新编辑"
	default:
		slog.Error("admin operation failed", "error", e)
	}
	respond(w, status, map[string]string{"error": message})
}
func decode(w http.ResponseWriter, r *http.Request, v any) bool {
	d := json.NewDecoder(http.MaxBytesReader(w, r.Body, 32768))
	d.DisallowUnknownFields()
	if d.Decode(v) != nil || d.Decode(new(any)) != io.EOF {
		respond(w, 400, map[string]string{"error": "请求格式不正确"})
		return false
	}
	return true
}
func bearer(r *http.Request) string {
	return strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")
}
func query(r *http.Request) Query {
	p, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if p < 1 {
		p = 1
	}
	if p > 100000 {
		p = 100000
	}
	s := r.URL.Query().Get("search")
	if len(s) > 200 {
		s = s[:200]
	}
	return Query{Search: s, Status: r.URL.Query().Get("status"), Page: p, Limit: 24}
}
func id(r *http.Request) int64 { n, _ := strconv.ParseInt(r.PathValue("id"), 10, 64); return n }
func (h *Handler) actor(r *http.Request) int64 {
	u, _ := h.store.Session(r.Context(), bearer(r))
	return u.ID
}
func (h *Handler) login(w http.ResponseWriter, r *http.Request) {
	ip, _, _ := net.SplitHostPort(r.RemoteAddr)
	if !h.limiter.Allow("login:"+ip, 10) {
		respond(w, 429, map[string]string{"error": "尝试过于频繁，请一分钟后重试"})
		return
	}
	var b struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if !decode(w, r, &b) {
		return
	}
	if len(b.Email) > 254 || len(b.Password) > 72 {
		fail(w, ErrUnauthorized)
		return
	}
	u, token, e := h.store.Login(r.Context(), b.Email, b.Password)
	if e != nil {
		fail(w, e)
		return
	}
	respond(w, 200, map[string]any{"user": u, "token": token})
}
func (h *Handler) password(w http.ResponseWriter, r *http.Request) {
	if !h.limiter.Allow("password:"+strconv.FormatInt(h.actor(r), 10), 5) {
		respond(w, 429, map[string]string{"error": "尝试过于频繁"})
		return
	}
	var b struct {
		Old  string `json:"old"`
		Next string `json:"next"`
	}
	if !decode(w, r, &b) {
		return
	}
	if len(b.Next) < 12 || len(b.Next) > 72 || len(b.Old) > 72 {
		respond(w, 422, map[string]string{"error": "新密码需要 12–72 字节"})
		return
	}
	if e := h.store.ChangePassword(r.Context(), h.actor(r), b.Old, b.Next); e != nil {
		fail(w, e)
		return
	}
	respond(w, 200, map[string]bool{"ok": true})
}
func (h *Handler) updateInquiry(w http.ResponseWriter, r *http.Request) {
	var b InquiryUpdate
	if !decode(w, r, &b) {
		return
	}
	b.Name = strings.TrimSpace(b.Name)
	b.Contact = strings.TrimSpace(b.Contact)
	if utf8.RuneCountInString(b.Name) < 2 || utf8.RuneCountInString(b.Name) > 80 || utf8.RuneCountInString(b.Contact) > 160 || utf8.RuneCountInString(b.Notes) > 5000 || b.Version.IsZero() || !(b.Status == "new" || b.Status == "following" || b.Status == "contacted" || b.Status == "closed") {
		respond(w, 422, map[string]string{"error": "请检查姓名、联系方式、状态和备注长度"})
		return
	}
	if e := h.store.UpdateInquiry(r.Context(), h.actor(r), id(r), b); e != nil {
		fail(w, e)
		return
	}
	respond(w, 200, map[string]bool{"ok": true})
}
func (h *Handler) updateAsset(w http.ResponseWriter, r *http.Request) {
	var b AssetUpdate
	if !decode(w, r, &b) {
		return
	}
	b.Name = strings.TrimSpace(b.Name)
	if b.Name == "" || utf8.RuneCountInString(b.Name) > 200 || utf8.RuneCountInString(b.Alt) > 500 || utf8.RuneCountInString(b.Category) > 80 || b.Version.IsZero() {
		respond(w, 422, map[string]string{"error": "请检查名称、分类和描述长度"})
		return
	}
	if e := h.store.UpdateAsset(r.Context(), h.actor(r), id(r), b); e != nil {
		fail(w, e)
		return
	}
	respond(w, 200, map[string]bool{"ok": true})
}
func (h *Handler) upload(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 9<<20)
	if e := r.ParseMultipartForm(9 << 20); e != nil {
		respond(w, 413, map[string]string{"error": "上传失败：图片不能超过 8 MB"})
		return
	}
	defer r.MultipartForm.RemoveAll()
	f, head, e := r.FormFile("file")
	if e != nil {
		respond(w, 400, map[string]string{"error": "请选择图片"})
		return
	}
	defer f.Close()
	bytes, e := io.ReadAll(io.LimitReader(f, (8<<20)+1))
	if e != nil || len(bytes) > 8<<20 {
		respond(w, 413, map[string]string{"error": "图片不能超过 8 MB"})
		return
	}
	mime := http.DetectContentType(bytes)
	extensions := map[string]string{"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp", "image/gif": ".gif"}
	ext, ok := extensions[mime]
	if !ok {
		respond(w, 415, map[string]string{"error": "仅支持 PNG、JPG、WebP、GIF 图片"})
		return
	}
	hash := sha256.Sum256(bytes)
	filename := hex.EncodeToString(hash[:]) + ext
	if e = os.MkdirAll(h.uploadDir, 0755); e != nil {
		fail(w, e)
		return
	}
	// Content-addressed names never use the client filename as a filesystem path.
	temp, e := os.CreateTemp(h.uploadDir, ".upload-*")
	if e != nil {
		fail(w, e)
		return
	}
	defer os.Remove(temp.Name())
	if _, e = temp.Write(bytes); e != nil {
		temp.Close()
		fail(w, e)
		return
	}
	if e = temp.Close(); e != nil {
		fail(w, e)
		return
	}
	if e = os.Rename(temp.Name(), filepath.Join(h.uploadDir, filename)); e != nil {
		fail(w, e)
		return
	}
	name := filepath.Base(head.Filename)
	if utf8.RuneCountInString(name) > 200 {
		name = string([]rune(name)[:200])
	}
	a, e := h.store.AddAsset(r.Context(), h.actor(r), Asset{Path: "/uploads/" + filename, Name: name, Category: "上传资源", Mime: mime, Bytes: int64(len(bytes))})
	if e != nil {
		fail(w, e)
		return
	}
	respond(w, 201, a)
}
func (h *Handler) file(w http.ResponseWriter, r *http.Request) {
	a, e := h.store.Asset(r.Context(), id(r))
	if e != nil {
		fail(w, e)
		return
	}
	var file string
	if strings.HasPrefix(a.Path, "/images/") {
		file = filepath.Join(h.publicDir, filepath.FromSlash(strings.TrimPrefix(a.Path, "/")))
	} else if strings.HasPrefix(a.Path, "/uploads/") {
		file = filepath.Join(h.uploadDir, filepath.Base(a.Path))
	} else {
		fail(w, ErrNotFound)
		return
	}
	if strings.Contains(a.Path, "..") {
		fail(w, ErrNotFound)
		return
	}
	w.Header().Set("Content-Type", a.Mime)
	w.Header().Set("X-Content-Type-Options", "nosniff")
	http.ServeFile(w, r, file)
}
