package httpapi

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"zhiyu.local/api/internal/site"
)

type fakeStore struct {
	writes int
	fail   bool
}

func (s *fakeStore) Catalog(context.Context) (site.Catalog, error) {
	return site.Catalog{"cases": json.RawMessage(`[]`)}, nil
}
func (s *fakeStore) SaveInquiry(context.Context, string, site.Inquiry) (int64, error) {
	s.writes++
	if s.fail {
		return 0, errors.New("database unavailable")
	}
	return 42, nil
}
func (s *fakeStore) Ping(context.Context) error { return nil }
func TestInquiryValidationAndDurability(t *testing.T) {
	valid := `{"name":"测试同学","school":"测试大学","major":"计算机","deadline":"2099-12-31","message":"这是一条用于验证数据库提交的测试需求"}`
	for _, test := range []struct {
		name, body     string
		fail           bool
		status, writes int
	}{{"valid", valid, false, 201, 1}, {"invalid", `{}`, false, 422, 0}, {"malformed", `{`, false, 400, 0}, {"multiple JSON", valid + valid, false, 400, 0}, {"storage failure", valid, true, 503, 1}} {
		t.Run(test.name, func(t *testing.T) {
			store := &fakeStore{fail: test.fail}
			request := httptest.NewRequest("POST", "/v1/inquiries", strings.NewReader(test.body))
			request.Header.Set("Content-Type", "application/json")
			request.Header.Set("Idempotency-Key", "verification-key-0001")
			response := httptest.NewRecorder()
			New(store).ServeHTTP(response, request)
			if response.Code != test.status {
				t.Fatalf("status=%d body=%s", response.Code, response.Body)
			}
			if store.writes != test.writes {
				t.Fatalf("writes=%d", store.writes)
			}
		})
	}
}
func TestCatalogConditionalRequest(t *testing.T) {
	handler := New(&fakeStore{})
	first := httptest.NewRecorder()
	handler.ServeHTTP(first, httptest.NewRequest("GET", "/v1/catalog", nil))
	tag := first.Header().Get("ETag")
	if tag == "" {
		t.Fatal("missing ETag")
	}
	request := httptest.NewRequest("GET", "/v1/catalog", nil)
	request.Header.Set("If-None-Match", tag)
	response := httptest.NewRecorder()
	handler.ServeHTTP(response, request)
	if response.Code != http.StatusNotModified || response.Body.Len() != 0 {
		t.Fatalf("invalid 304: %d %s", response.Code, response.Body)
	}
}
