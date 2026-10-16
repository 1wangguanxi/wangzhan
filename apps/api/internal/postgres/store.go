// Package postgres contains all SQL and transactional persistence details.
package postgres

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"os"
	"zhiyu.local/api/internal/site"
)

type Store struct{ pool *pgxpool.Pool }

func Open(ctx context.Context, url string) (*Store, error) {
	cfg, err := pgxpool.ParseConfig(url)
	if err != nil {
		return nil, err
	}
	cfg.MaxConns = 10
	cfg.MinConns = 1
	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		return nil, err
	}
	if err = pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, err
	}
	return &Store{pool: pool}, nil
}
func (s *Store) Close()                         { s.pool.Close() }
func (s *Store) Ping(ctx context.Context) error { return s.pool.Ping(ctx) }
func (s *Store) Catalog(ctx context.Context) (site.Catalog, error) {
	rows, err := s.pool.Query(ctx, `SELECT collection,jsonb_agg(payload ORDER BY ordinal) FROM content_items GROUP BY collection`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	result := site.Catalog{"cases": json.RawMessage(`[]`), "schools": json.RawMessage(`[]`), "faqs": json.RawMessage(`[]`), "reviews": json.RawMessage(`[]`)}
	for rows.Next() {
		var key string
		var data []byte
		if err = rows.Scan(&key, &data); err != nil {
			return nil, err
		}
		result[key] = data
	}
	return result, rows.Err()
}
func (s *Store) SaveInquiry(ctx context.Context, key string, input site.Inquiry) (int64, error) {
	body, _ := json.Marshal(input)
	sum := sha256.Sum256(body)
	hash := hex.EncodeToString(sum[:])
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback(ctx)
	// Serialize retries for one key, including concurrent retries, without global locks.
	if _, err = tx.Exec(ctx, `SELECT pg_advisory_xact_lock(hashtextextended($1,0))`, key); err != nil {
		return 0, err
	}
	var id int64
	var previous string
	err = tx.QueryRow(ctx, `INSERT INTO inquiries(idempotency_key,payload_hash,name,school,major,deadline,message,contact,session_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT(idempotency_key) DO UPDATE SET idempotency_key=EXCLUDED.idempotency_key RETURNING id,payload_hash`, key, hash, input.Name, input.School, input.Major, input.Deadline, input.Message, input.Contact, input.SessionID).Scan(&id, &previous)
	if err != nil {
		return 0, err
	}
	if hash != previous {
		return 0, site.ErrConflict
	}
	if err = tx.Commit(ctx); err != nil {
		return 0, err
	}
	return id, nil
}
func (s *Store) Seed(ctx context.Context, file string) error {
	bytes, err := os.ReadFile(file)
	if err != nil {
		return err
	}
	var catalog map[string][]json.RawMessage
	if err = json.Unmarshal(bytes, &catalog); err != nil {
		return err
	}
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)
	for collection, items := range catalog {
		for index, item := range items {
			var identity struct {
				ID int `json:"id"`
			}
			if err = json.Unmarshal(item, &identity); err != nil {
				return err
			}
			if identity.ID < 1 {
				return fmt.Errorf("invalid content ID")
			}
			if _, err = tx.Exec(ctx, `INSERT INTO content_items(collection,id,ordinal,payload) VALUES($1,$2,$3,$4) ON CONFLICT(collection,id) DO UPDATE SET ordinal=EXCLUDED.ordinal,payload=EXCLUDED.payload`, collection, identity.ID, index, item); err != nil {
				return err
			}
		}
	}
	return tx.Commit(ctx)
}
