package analytics

import (
	"testing"
	"time"
)

func TestValidEventDoesNotAllowArbitraryPageOrPayload(t *testing.T) {
	valid := Event{ID: "8a03b48b-4ac5-4a4b-a4f2-a506aee40001", SessionID: "8a03b48b-4ac5-4a4b-a4f2-a506aee40002", Kind: "click", Path: "/cases.html", Target: "button"}
	if !Valid(valid) {
		t.Fatal("valid event rejected")
	}
	for _, mutate := range []func(*Event){func(e *Event) { e.Path = "/contact.html?email=private" }, func(e *Event) { e.Kind = "conversion" }, func(e *Event) { e.SessionID = "not-uuid" }, func(e *Event) { e.Target = string(make([]byte, 101)) }} {
		bad := valid
		mutate(&bad)
		if Valid(bad) {
			t.Fatal("invalid event accepted")
		}
	}
}
func TestLimiter(t *testing.T) {
	var l Limiter
	if !l.Allow("ip", 1) || l.Allow("ip", 1) {
		t.Fatal("limit not enforced")
	}
	l.entries["ip"] = window{at: time.Now().Add(-2 * time.Minute), count: 100}
	if !l.Allow("ip", 1) {
		t.Fatal("window did not reset")
	}
}
