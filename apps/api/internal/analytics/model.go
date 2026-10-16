package analytics

import (
	"context"
	"time"
)

type Event struct {
	ID        string `json:"id"`
	SessionID string `json:"sessionId"`
	Kind      string `json:"kind"`
	Path      string `json:"path"`
	Target    string `json:"target"`
}
type Point struct {
	Time        time.Time `json:"time"`
	Views       int       `json:"views"`
	Clicks      int       `json:"clicks"`
	Submissions int       `json:"submissions"`
}
type TopPage struct {
	Path   string `json:"path"`
	Views  int    `json:"views"`
	Clicks int    `json:"clicks"`
}
type Heat struct {
	Day   int `json:"day"`
	Hour  int `json:"hour"`
	Views int `json:"views"`
}
type Dashboard struct {
	GeneratedAt         time.Time `json:"generatedAt"`
	Since               time.Time `json:"since"`
	Until               time.Time `json:"until"`
	BucketMinutes       int       `json:"bucketMinutes"`
	Views               int       `json:"views"`
	Clicks              int       `json:"clicks"`
	ContactClicks       int       `json:"contactClicks"`
	Sessions            int       `json:"sessions"`
	Active              int       `json:"active"`
	Submissions         int       `json:"submissions"`
	ConvertedSessions   int       `json:"convertedSessions"`
	Unattributed        int       `json:"unattributed"`
	PreviousViews       int       `json:"previousViews"`
	PreviousSubmissions int       `json:"previousSubmissions"`
	ConversionRate      float64   `json:"conversionRate"`
	Series              []Point   `json:"series"`
	Pages               []TopPage `json:"pages"`
	Heatmap             []Heat    `json:"heatmap"`
}
type Store interface {
	Record(context.Context, []Event) error
	Dashboard(context.Context, string) (Dashboard, error)
}
