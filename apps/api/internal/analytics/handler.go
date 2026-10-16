package analytics

import (
	"encoding/json"
	"io"
	"net"
	"net/http"
	"regexp"
	"strings"
	"sync"
	"time"
)

var uuid = regexp.MustCompile(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`)
var pages = map[string]bool{"/": true, "/index.html": true, "/services.html": true, "/process.html": true, "/about.html": true, "/cases.html": true, "/reviews.html": true, "/faq.html": true, "/contact.html": true}

func Valid(e Event) bool {
	return uuid.MatchString(e.ID) && uuid.MatchString(e.SessionID) && pages[e.Path] && (e.Kind == "page_view" || e.Kind == "click" || e.Kind == "contact_click" || e.Kind == "heartbeat") && len(e.Target) <= 100 && !strings.ContainsAny(e.Target, "\n\r")
}

type window struct {
	at    time.Time
	count int
}
type Limiter struct {
	mu      sync.Mutex
	entries map[string]window
}

func (l *Limiter) Allow(key string, max int) bool {
	l.mu.Lock()
	defer l.mu.Unlock()
	if l.entries == nil {
		l.entries = map[string]window{}
	}
	now := time.Now()
	if len(l.entries) > 10000 {
		for k, v := range l.entries {
			if now.Sub(v.at) > time.Minute {
				delete(l.entries, k)
			}
		}
		if len(l.entries) > 10000 {
			return false
		}
	}
	v := l.entries[key]
	if now.Sub(v.at) > time.Minute {
		v = window{at: now}
	}
	v.count++
	l.entries[key] = v
	return v.count <= max
}
func New(s Store) http.Handler {
	limiter := &Limiter{}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		if r.Method != "POST" {
			http.Error(w, "method not allowed", 405)
			return
		}
		ip, _, _ := net.SplitHostPort(r.RemoteAddr)
		if !limiter.Allow(ip, 600) {
			http.Error(w, "rate limited", 429)
			return
		}
		var body struct {
			Events []Event `json:"events"`
		}
		d := json.NewDecoder(http.MaxBytesReader(w, r.Body, 32768))
		d.DisallowUnknownFields()
		if d.Decode(&body) != nil || d.Decode(new(any)) != io.EOF || len(body.Events) == 0 || len(body.Events) > 30 {
			http.Error(w, "invalid batch", 400)
			return
		}
		for _, e := range body.Events {
			if !Valid(e) {
				http.Error(w, "invalid event", 400)
				return
			}
		}
		if err := s.Record(r.Context(), body.Events); err != nil {
			http.Error(w, "temporarily unavailable", 503)
			return
		}
		w.WriteHeader(204)
	})
}
