// Package management owns authenticated operations; storage and HTTP stay behind explicit contracts.
package management

import (
	"context"
	"errors"
	"time"
)

var ErrUnauthorized = errors.New("invalid credentials")
var ErrNotFound = errors.New("not found")

type User struct {
	ID    int64  `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}
type Query struct {
	Search string
	Status string
	Page   int
	Limit  int
}
type Page[T any] struct {
	Items []T `json:"items"`
	Total int `json:"total"`
	Page  int `json:"page"`
	Limit int `json:"limit"`
}
type Inquiry struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	School    string    `json:"school"`
	Major     string    `json:"major"`
	Deadline  string    `json:"deadline"`
	Message   string    `json:"message"`
	Contact   string    `json:"contact"`
	Status    string    `json:"status"`
	Notes     string    `json:"notes"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
type InquiryUpdate struct {
	Name    string    `json:"name"`
	Contact string    `json:"contact"`
	Status  string    `json:"status"`
	Notes   string    `json:"notes"`
	Version time.Time `json:"version"`
}
type Asset struct {
	ID        int64     `json:"id"`
	Path      string    `json:"path"`
	Name      string    `json:"name"`
	Alt       string    `json:"alt"`
	Category  string    `json:"category"`
	Mime      string    `json:"mime"`
	Bytes     int64     `json:"bytes"`
	Archived  bool      `json:"archived"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
type AssetUpdate struct {
	Name     string    `json:"name"`
	Alt      string    `json:"alt"`
	Category string    `json:"category"`
	Archived bool      `json:"archived"`
	Version  time.Time `json:"version"`
}
type Audit struct {
	ID        int64     `json:"id"`
	Actor     string    `json:"actor"`
	Action    string    `json:"action"`
	Subject   string    `json:"subject"`
	CreatedAt time.Time `json:"createdAt"`
}

var ErrConflict = errors.New("record changed; reload before saving")

type Store interface {
	Login(context.Context, string, string) (User, string, error)
	Session(context.Context, string) (User, error)
	Logout(context.Context, string) error
	ChangePassword(context.Context, int64, string, string) error
	Inquiries(context.Context, Query) (Page[Inquiry], error)
	UpdateInquiry(context.Context, int64, int64, InquiryUpdate) error
	Assets(context.Context, Query) (Page[Asset], error)
	Asset(context.Context, int64) (Asset, error)
	UpdateAsset(context.Context, int64, int64, AssetUpdate) error
	AddAsset(context.Context, int64, Asset) (Asset, error)
	Audit(context.Context) ([]Audit, error)
}
