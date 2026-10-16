package postgres

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
	"strings"
	"zhiyu.local/api/internal/management"
)

func tokenHash(s string) string { h := sha256.Sum256([]byte(s)); return hex.EncodeToString(h[:]) }
func (s *Store) BootstrapAdmin(ctx context.Context, email, name, password string) error {
	if len(password) < 12 || len(password) > 72 {
		return fmt.Errorf("password must contain 12–72 bytes")
	}
	hash, e := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if e != nil {
		return e
	}
	_, e = s.pool.Exec(ctx, `INSERT INTO admin_users(email,name,password_hash) VALUES($1,$2,$3) ON CONFLICT(email) DO NOTHING`, strings.ToLower(strings.TrimSpace(email)), name, string(hash))
	return e
}
func (s *Store) Login(ctx context.Context, email, password string) (management.User, string, error) {
	var u management.User
	var hash string
	tx, e := s.pool.Begin(ctx)
	if e != nil {
		return u, "", e
	}
	defer tx.Rollback(ctx)
	e = tx.QueryRow(ctx, `SELECT id,email,name,password_hash FROM admin_users WHERE email=$1 FOR UPDATE`, strings.ToLower(strings.TrimSpace(email))).Scan(&u.ID, &u.Email, &u.Name, &hash)
	if e != nil || bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) != nil {
		return u, "", management.ErrUnauthorized
	}
	raw := make([]byte, 32)
	if _, e = rand.Read(raw); e != nil {
		return u, "", e
	}
	token := hex.EncodeToString(raw)
	if _, e = tx.Exec(ctx, `DELETE FROM admin_sessions WHERE expires_at<now()`); e != nil {
		return u, "", e
	}
	if _, e = tx.Exec(ctx, `INSERT INTO admin_sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '12 hours')`, tokenHash(token), u.ID); e != nil {
		return u, "", e
	}
	if _, e = tx.Exec(ctx, `INSERT INTO admin_audit(user_id,action,subject) VALUES($1,'login','session')`, u.ID); e != nil {
		return u, "", e
	}
	return u, token, tx.Commit(ctx)
}
func (s *Store) Session(ctx context.Context, token string) (management.User, error) {
	var u management.User
	if len(token) != 64 {
		return u, management.ErrUnauthorized
	}
	e := s.pool.QueryRow(ctx, `SELECT u.id,u.email,u.name FROM admin_sessions s JOIN admin_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()`, tokenHash(token)).Scan(&u.ID, &u.Email, &u.Name)
	if errors.Is(e, pgx.ErrNoRows) {
		e = management.ErrUnauthorized
	}
	return u, e
}
func (s *Store) Logout(ctx context.Context, token string) error {
	_, e := s.pool.Exec(ctx, `DELETE FROM admin_sessions WHERE token_hash=$1`, tokenHash(token))
	return e
}
func (s *Store) ChangePassword(ctx context.Context, id int64, old, next string) error {
	tx, e := s.pool.Begin(ctx)
	if e != nil {
		return e
	}
	defer tx.Rollback(ctx)
	var hash string
	if e = tx.QueryRow(ctx, `SELECT password_hash FROM admin_users WHERE id=$1 FOR UPDATE`, id).Scan(&hash); e != nil {
		return e
	}
	if bcrypt.CompareHashAndPassword([]byte(hash), []byte(old)) != nil {
		return management.ErrUnauthorized
	}
	encoded, e := bcrypt.GenerateFromPassword([]byte(next), bcrypt.DefaultCost)
	if e != nil {
		return e
	}
	if _, e = tx.Exec(ctx, `UPDATE admin_users SET password_hash=$2 WHERE id=$1`, id, string(encoded)); e != nil {
		return e
	}
	if _, e = tx.Exec(ctx, `DELETE FROM admin_sessions WHERE user_id=$1`, id); e != nil {
		return e
	}
	if _, e = tx.Exec(ctx, `INSERT INTO admin_audit(user_id,action,subject) VALUES($1,'password_change','account')`, id); e != nil {
		return e
	}
	return tx.Commit(ctx)
}
func (s *Store) Inquiries(ctx context.Context, q management.Query) (management.Page[management.Inquiry], error) {
	out := management.Page[management.Inquiry]{Items: []management.Inquiry{}, Page: q.Page, Limit: q.Limit}
	filter := ` FROM inquiries WHERE ($1='' OR name ILIKE '%'||$1||'%' OR school ILIKE '%'||$1||'%' OR contact ILIKE '%'||$1||'%') AND ($2='' OR status=$2)`
	if e := s.pool.QueryRow(ctx, `SELECT count(*)`+filter, q.Search, q.Status).Scan(&out.Total); e != nil {
		return out, e
	}
	rows, e := s.pool.Query(ctx, `SELECT id,name,school,major,to_char(deadline,'YYYY-MM-DD'),message,contact,status,notes,created_at,updated_at`+filter+` ORDER BY id DESC LIMIT $3 OFFSET $4`, q.Search, q.Status, q.Limit, (q.Page-1)*q.Limit)
	if e != nil {
		return out, e
	}
	defer rows.Close()
	for rows.Next() {
		var i management.Inquiry
		if e = rows.Scan(&i.ID, &i.Name, &i.School, &i.Major, &i.Deadline, &i.Message, &i.Contact, &i.Status, &i.Notes, &i.CreatedAt, &i.UpdatedAt); e != nil {
			return out, e
		}
		out.Items = append(out.Items, i)
	}
	return out, rows.Err()
}
func (s *Store) UpdateInquiry(ctx context.Context, actor, id int64, u management.InquiryUpdate) error {
	tx, e := s.pool.Begin(ctx)
	if e != nil {
		return e
	}
	defer tx.Rollback(ctx)
	r, e := tx.Exec(ctx, `UPDATE inquiries SET name=$2,contact=$3,status=$4,notes=$5,updated_at=now() WHERE id=$1 AND updated_at=$6`, id, u.Name, u.Contact, u.Status, u.Notes, u.Version)
	if e != nil {
		return e
	}
	if r.RowsAffected() == 0 {
		return management.ErrConflict
	}
	if _, e = tx.Exec(ctx, `INSERT INTO admin_audit(user_id,action,subject) VALUES($1,'inquiry_update',$2)`, actor, fmt.Sprint(id)); e != nil {
		return e
	}
	return tx.Commit(ctx)
}
func scanAsset(row pgx.Row) (management.Asset, error) {
	var a management.Asset
	e := row.Scan(&a.ID, &a.Path, &a.Name, &a.Alt, &a.Category, &a.Mime, &a.Bytes, &a.Archived, &a.CreatedAt, &a.UpdatedAt)
	if errors.Is(e, pgx.ErrNoRows) {
		e = management.ErrNotFound
	}
	return a, e
}

const assetCols = `id,path,name,alt,category,mime,bytes,archived,created_at,updated_at`

func (s *Store) Asset(ctx context.Context, id int64) (management.Asset, error) {
	return scanAsset(s.pool.QueryRow(ctx, `SELECT `+assetCols+` FROM media_assets WHERE id=$1`, id))
}
func (s *Store) Assets(ctx context.Context, q management.Query) (management.Page[management.Asset], error) {
	out := management.Page[management.Asset]{Items: []management.Asset{}, Page: q.Page, Limit: q.Limit}
	f := ` FROM media_assets WHERE ($1='' OR name ILIKE '%'||$1||'%' OR category ILIKE '%'||$1||'%' OR path ILIKE '%'||$1||'%') AND archived=$2`
	if e := s.pool.QueryRow(ctx, `SELECT count(*)`+f, q.Search, q.Status == "archived").Scan(&out.Total); e != nil {
		return out, e
	}
	rows, e := s.pool.Query(ctx, `SELECT `+assetCols+f+` ORDER BY id DESC LIMIT $3 OFFSET $4`, q.Search, q.Status == "archived", q.Limit, (q.Page-1)*q.Limit)
	if e != nil {
		return out, e
	}
	defer rows.Close()
	for rows.Next() {
		a, e := scanAsset(rows)
		if e != nil {
			return out, e
		}
		out.Items = append(out.Items, a)
	}
	return out, rows.Err()
}
func (s *Store) UpdateAsset(ctx context.Context, actor, id int64, u management.AssetUpdate) error {
	tx, e := s.pool.Begin(ctx)
	if e != nil {
		return e
	}
	defer tx.Rollback(ctx)
	r, e := tx.Exec(ctx, `UPDATE media_assets SET name=$2,alt=$3,category=$4,archived=$5,updated_at=now() WHERE id=$1 AND updated_at=$6`, id, u.Name, u.Alt, u.Category, u.Archived, u.Version)
	if e != nil {
		return e
	}
	if r.RowsAffected() == 0 {
		return management.ErrConflict
	}
	if _, e = tx.Exec(ctx, `INSERT INTO admin_audit(user_id,action,subject) VALUES($1,'asset_update',$2)`, actor, fmt.Sprint(id)); e != nil {
		return e
	}
	return tx.Commit(ctx)
}
func (s *Store) AddAsset(ctx context.Context, actor int64, a management.Asset) (management.Asset, error) {
	tx, e := s.pool.Begin(ctx)
	if e != nil {
		return a, e
	}
	defer tx.Rollback(ctx)
	a, e = scanAsset(tx.QueryRow(ctx, `INSERT INTO media_assets(path,name,alt,category,mime,bytes) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(path) DO UPDATE SET path=EXCLUDED.path RETURNING `+assetCols, a.Path, a.Name, a.Alt, a.Category, a.Mime, a.Bytes))
	if e != nil {
		return a, e
	}
	if actor > 0 {
		if _, e = tx.Exec(ctx, `INSERT INTO admin_audit(user_id,action,subject) VALUES($1,'asset_upload',$2)`, actor, fmt.Sprint(a.ID)); e != nil {
			return a, e
		}
	}
	return a, tx.Commit(ctx)
}
func (s *Store) Audit(ctx context.Context) ([]management.Audit, error) {
	out := []management.Audit{}
	rows, e := s.pool.Query(ctx, `SELECT a.id,coalesce(u.name,'系统'),a.action,a.subject,a.created_at FROM admin_audit a LEFT JOIN admin_users u ON u.id=a.user_id ORDER BY a.id DESC LIMIT 100`)
	if e != nil {
		return out, e
	}
	defer rows.Close()
	for rows.Next() {
		var a management.Audit
		if e = rows.Scan(&a.ID, &a.Actor, &a.Action, &a.Subject, &a.CreatedAt); e != nil {
			return out, e
		}
		out = append(out, a)
	}
	return out, rows.Err()
}

// PurgeAnalytics bounds raw event retention; inquiry records remain the authoritative conversion ledger.
func (s *Store) PurgeAnalytics(ctx context.Context) error {
	_, e := s.pool.Exec(ctx, `DELETE FROM analytics_events WHERE created_at<now()-interval '90 days'`)
	return e
}
