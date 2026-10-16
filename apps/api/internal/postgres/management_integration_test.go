package postgres

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"
	"zhiyu.local/api/internal/analytics"
	"zhiyu.local/api/internal/management"
	"zhiyu.local/api/internal/site"
)

func TestManagementAndAnalyticsIntegration(t *testing.T) {
	url := os.Getenv("DATABASE_URL_ADMIN_TEST")
	if url == "" {
		t.Skip("set DATABASE_URL_ADMIN_TEST to an isolated test database")
	}
	ctx := context.Background()
	s, e := Open(ctx, url)
	if e != nil {
		t.Fatal(e)
	}
	defer s.Close()
	if e = s.Migrate(ctx); e != nil {
		t.Fatal(e)
	}
	var database string
	if e = s.pool.QueryRow(ctx, `SELECT current_database()`).Scan(&database); e != nil || !strings.HasSuffix(database, "_test") {
		t.Fatal("management tests require a dedicated database ending in _test")
	}
	// This opt-in database is dedicated to management integration, never the local production database.
	if _, e = s.pool.Exec(ctx, `TRUNCATE admin_audit,admin_sessions,admin_users,analytics_events,inquiries,media_assets RESTART IDENTITY CASCADE`); e != nil {
		t.Fatal(e)
	}
	defer s.pool.Exec(ctx, `TRUNCATE admin_audit,admin_sessions,admin_users,analytics_events,inquiries,media_assets RESTART IDENTITY CASCADE`)
	if e = s.BootstrapAdmin(ctx, "integration@example.test", "测试管理员", "long-test-password-123"); e != nil {
		t.Fatal(e)
	}
	if _, _, e = s.Login(ctx, "integration@example.test", "wrong"); !errors.Is(e, management.ErrUnauthorized) {
		t.Fatal("invalid login accepted")
	}
	user, token, e := s.Login(ctx, "integration@example.test", "long-test-password-123")
	if e != nil {
		t.Fatal(e)
	}
	handler := management.New(s, s, t.TempDir(), t.TempDir())
	call := func(method, path, auth string, body any) *httptest.ResponseRecorder {
		var b bytes.Buffer
		if body != nil {
			json.NewEncoder(&b).Encode(body)
		}
		r := httptest.NewRequest(method, path, &b)
		if auth != "" {
			r.Header.Set("Authorization", "Bearer "+auth)
		}
		r.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		handler.ServeHTTP(w, r)
		return w
	}
	for _, path := range []string{"/v1/admin/analytics?period=24h", "/v1/admin/inquiries", "/v1/admin/assets", "/v1/admin/audit", "/v1/admin/assets/1/file"} {
		if w := call("GET", path, "", nil); w.Code != 401 {
			t.Fatalf("unauthorized %s: %d", path, w.Code)
		}
	}
	if w := call("GET", "/v1/admin/me", token, nil); w.Code != 200 {
		t.Fatal(w.Body.String())
	}
	session1 := "aaaaaaaa-0000-4000-8000-000000000001"
	session2 := "aaaaaaaa-0000-4000-8000-000000000002"
	events := []analytics.Event{{ID: "bbbbbbbb-0000-4000-8000-000000000001", SessionID: session1, Kind: "page_view", Path: "/"}, {ID: "bbbbbbbb-0000-4000-8000-000000000002", SessionID: session2, Kind: "page_view", Path: "/cases.html"}, {ID: "bbbbbbbb-0000-4000-8000-000000000003", SessionID: session1, Kind: "contact_click", Path: "/", Target: "contact-modal"}, {ID: "bbbbbbbb-0000-4000-8000-000000000004", SessionID: session2, Kind: "click", Path: "/cases.html", Target: "button"}}
	if e = s.Record(ctx, events); e != nil {
		t.Fatal(e)
	}
	if e = s.Record(ctx, events); e != nil {
		t.Fatal(e)
	}
	inquiry := site.Inquiry{Name: "测试客户", School: "测试大学", Major: "设计", Deadline: "2099-01-01", Message: "这是隔离测试数据库中的测试留言内容", Contact: "test@example.test", SessionID: session1}
	first, e := s.SaveInquiry(ctx, "admin-integration-key-0001", inquiry)
	if e != nil {
		t.Fatal(e)
	}
	again, e := s.SaveInquiry(ctx, "admin-integration-key-0001", inquiry)
	if e != nil || again != first {
		t.Fatal("idempotency broken", e)
	}
	if _, e = s.SaveInquiry(ctx, "admin-integration-key-0002", inquiry); e != nil {
		t.Fatal(e)
	}
	inquiry.SessionID = ""
	if _, e = s.SaveInquiry(ctx, "admin-integration-key-0003", inquiry); e != nil {
		t.Fatal(e)
	}
	for _, period := range []string{"24h", "7d", "30d"} {
		d, e := s.Dashboard(ctx, period)
		if e != nil {
			t.Fatal(e)
		}
		if d.Views != 2 || d.Clicks != 2 || d.Sessions != 2 || d.Active != 2 || d.Submissions != 3 || d.ConvertedSessions != 1 || d.ConversionRate != 50 || d.Unattributed != 1 {
			t.Fatalf("incorrect metrics: %+v", d)
		}
		views, leads := 0, 0
		for _, p := range d.Series {
			views += p.Views
			leads += p.Submissions
		}
		if views != 2 || leads != 3 {
			t.Fatal("chart and totals disagree")
		}
	}
	rows, e := s.Inquiries(ctx, management.Query{Search: "test@example", Page: 1, Limit: 24})
	if e != nil || rows.Total != 3 {
		t.Fatal("customer search", e, rows)
	}
	i := rows.Items[0]
	u := management.InquiryUpdate{Name: "测试客户修改", Contact: i.Contact, Status: "following", Notes: "测试备注", Version: i.UpdatedAt}
	if e = s.UpdateInquiry(ctx, user.ID, i.ID, u); e != nil {
		t.Fatal(e)
	}
	if e = s.UpdateInquiry(ctx, user.ID, i.ID, u); !errors.Is(e, management.ErrConflict) {
		t.Fatal("stale write accepted", e)
	}
	if w := call("PATCH", fmt.Sprintf("/v1/admin/inquiries/%d", i.ID), token, map[string]any{"name": "测", "status": "invalid"}); w.Code != 422 {
		t.Fatal("validation", w.Code, w.Body.String())
	}
	a, e := s.AddAsset(ctx, user.ID, management.Asset{Path: "/images/test.png", Name: "test.png", Category: "测试", Mime: "image/png", Bytes: 123})
	if e != nil {
		t.Fatal(e)
	}
	if e = s.UpdateAsset(ctx, user.ID, a.ID, management.AssetUpdate{Name: "新名称", Alt: "测试图片", Category: "测试分类", Archived: true, Version: a.UpdatedAt}); e != nil {
		t.Fatal(e)
	}
	assets, e := s.Assets(ctx, management.Query{Page: 1, Limit: 24, Status: "archived", Search: "新名称"})
	if e != nil || assets.Total != 1 {
		t.Fatal("asset archive", e)
	}
	log, e := s.Audit(ctx)
	if e != nil || len(log) < 4 {
		t.Fatal("missing audit trail", e)
	}
	if e = s.ChangePassword(ctx, user.ID, "wrong", "new-long-test-password"); !errors.Is(e, management.ErrUnauthorized) {
		t.Fatal("old password validation")
	}
	if e = s.ChangePassword(ctx, user.ID, "long-test-password-123", "new-long-test-password"); e != nil {
		t.Fatal(e)
	}
	if _, e = s.Session(ctx, token); !errors.Is(e, management.ErrUnauthorized) {
		t.Fatal("password change did not revoke sessions")
	}
	_, token, e = s.Login(ctx, "integration@example.test", "new-long-test-password")
	if e != nil {
		t.Fatal(e)
	}
	if e = s.Logout(ctx, token); e != nil {
		t.Fatal(e)
	}
	if w := call(http.MethodGet, "/v1/admin/me", token, nil); w.Code != 401 {
		t.Fatal("logout token still valid")
	}
	_, e = s.pool.Exec(ctx, `INSERT INTO analytics_events(id,session_id,kind,path,created_at) VALUES('cccccccc-0000-4000-8000-000000000001',$1,'page_view','/',$2)`, session1, time.Now().Add(-91*24*time.Hour))
	if e != nil {
		t.Fatal(e)
	}
	if e = s.PurgeAnalytics(ctx); e != nil {
		t.Fatal(e)
	}
	var count int
	s.pool.QueryRow(ctx, `SELECT count(*) FROM analytics_events`).Scan(&count)
	if count != 4 {
		t.Fatal("retention failed")
	}
}
