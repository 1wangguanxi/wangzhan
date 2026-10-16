package postgres

import (
	"context"
	"errors"
	"fmt"
	"os"
	"sync"
	"testing"
	"time"
	"zhiyu.local/api/internal/site"
)

func TestConcurrentRetryAndConflict(t *testing.T) {
	url := os.Getenv("DATABASE_URL_TEST")
	if url == "" {
		t.Skip("set DATABASE_URL_TEST for PostgreSQL integration")
	}
	ctx := context.Background()
	store, err := Open(ctx, url)
	if err != nil {
		t.Fatal(err)
	}
	defer store.Close()
	if err = store.Migrate(ctx); err != nil {
		t.Fatal(err)
	}
	key := fmt.Sprintf("integration-%d", time.Now().UnixNano())
	defer store.pool.Exec(ctx, `DELETE FROM inquiries WHERE idempotency_key=$1`, key)
	input := site.Inquiry{Name: "测试同学", School: "测试大学", Major: "计算机", Deadline: "2099-12-31", Message: "仅用于验证本地事务幂等性的测试内容"}
	var wait sync.WaitGroup
	ids := make(chan int64, 8)
	failures := make(chan error, 8)
	for i := 0; i < 8; i++ {
		wait.Add(1)
		go func() {
			defer wait.Done()
			id, err := store.SaveInquiry(ctx, key, input)
			if err != nil {
				failures <- err
			} else {
				ids <- id
			}
		}()
	}
	wait.Wait()
	close(ids)
	close(failures)
	for err := range failures {
		t.Fatal(err)
	}
	var first int64
	for id := range ids {
		if first == 0 {
			first = id
		}
		if id != first {
			t.Fatalf("duplicate submissions returned different IDs")
		}
	}
	var count int
	if err = store.pool.QueryRow(ctx, `SELECT count(*) FROM inquiries WHERE idempotency_key=$1`, key).Scan(&count); err != nil || count != 1 {
		t.Fatalf("count=%d err=%v", count, err)
	}
	input.Message = "换了内容却复用原来的请求标识应当被拒绝"
	if _, err = store.SaveInquiry(ctx, key, input); !errors.Is(err, site.ErrConflict) {
		t.Fatalf("expected conflict, got %v", err)
	}
}
