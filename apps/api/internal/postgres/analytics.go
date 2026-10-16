package postgres

import (
	"context"
	"github.com/jackc/pgx/v5"
	"time"
	"zhiyu.local/api/internal/analytics"
)

func (s *Store) Record(ctx context.Context, events []analytics.Event) error {
	tx, e := s.pool.Begin(ctx)
	if e != nil {
		return e
	}
	defer tx.Rollback(ctx)
	b := &pgx.Batch{}
	for _, v := range events {
		b.Queue(`INSERT INTO analytics_events(id,session_id,kind,path,target) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING`, v.ID, v.SessionID, v.Kind, v.Path, v.Target)
	}
	r := tx.SendBatch(ctx, b)
	if e = r.Close(); e != nil {
		return e
	}
	return tx.Commit(ctx)
}
func (s *Store) Dashboard(ctx context.Context, period string) (analytics.Dashboard, error) {
	now := time.Now().UTC()
	hours := 24
	bucket := 15
	switch period {
	case "7d":
		hours = 24 * 7
		bucket = 60
	case "30d":
		hours = 24 * 30
		bucket = 1440
	}
	// Align buckets in UTC+8, including the current incomplete bucket. Both chart and totals use identical bounds.
	loc := time.FixedZone("Asia/Shanghai", 8*3600)
	local := now.In(loc)
	var start time.Time
	if bucket == 1440 {
		start = time.Date(local.Year(), local.Month(), local.Day(), 0, 0, 0, 0, loc).AddDate(0, 0, -29)
	} else {
		start = now.Truncate(time.Duration(bucket) * time.Minute).Add(-time.Duration(hours)*time.Hour + time.Duration(bucket)*time.Minute)
	}
	start = start.UTC()
	duration := now.Sub(start)
	previous := start.Add(-duration)
	d := analytics.Dashboard{GeneratedAt: now, Since: start, Until: now, BucketMinutes: bucket, Series: []analytics.Point{}, Pages: []analytics.TopPage{}, Heatmap: []analytics.Heat{}}
	// One read-only snapshot keeps counters, conversion denominators and chart mutually consistent.
	tx, e := s.pool.BeginTx(ctx, pgx.TxOptions{IsoLevel: pgx.RepeatableRead, AccessMode: pgx.ReadOnly})
	if e != nil {
		return d, e
	}
	defer tx.Rollback(ctx)
	e = tx.QueryRow(ctx, `SELECT count(*) FILTER(WHERE kind='page_view'),count(*) FILTER(WHERE kind IN ('click','contact_click')),count(*) FILTER(WHERE kind='contact_click'),count(DISTINCT session_id) FILTER(WHERE kind='page_view') FROM analytics_events WHERE created_at >= $1 AND created_at < $2`, start, now).Scan(&d.Views, &d.Clicks, &d.ContactClicks, &d.Sessions)
	if e != nil {
		return d, e
	}
	e = tx.QueryRow(ctx, `SELECT count(DISTINCT session_id) FROM analytics_events WHERE created_at >= $1 AND created_at < $2`, now.Add(-5*time.Minute), now).Scan(&d.Active)
	if e != nil {
		return d, e
	}
	e = tx.QueryRow(ctx, `SELECT count(*),count(*) FILTER(WHERE NOT EXISTS(SELECT 1 FROM analytics_events e WHERE e.session_id::text=i.session_id AND e.kind='page_view' AND e.created_at >= $1 AND e.created_at<$2)),count(DISTINCT session_id) FILTER(WHERE EXISTS(SELECT 1 FROM analytics_events e WHERE e.session_id::text=i.session_id AND e.kind='page_view' AND e.created_at >= $1 AND e.created_at<$2)) FROM inquiries i WHERE created_at >= $1 AND created_at<$2`, start, now).Scan(&d.Submissions, &d.Unattributed, &d.ConvertedSessions)
	if e != nil {
		return d, e
	}
	if d.Sessions > 0 {
		d.ConversionRate = 100 * float64(d.ConvertedSessions) / float64(d.Sessions)
	}
	e = tx.QueryRow(ctx, `SELECT (SELECT count(*) FROM analytics_events WHERE kind='page_view' AND created_at >= $1 AND created_at<$2),(SELECT count(*) FROM inquiries WHERE created_at >= $1 AND created_at<$2)`, previous, start).Scan(&d.PreviousViews, &d.PreviousSubmissions)
	if e != nil {
		return d, e
	}
	rows, e := tx.Query(ctx, `WITH buckets AS(SELECT generate_series($1::timestamptz,$2::timestamptz,make_interval(mins=>$3)) AS time), traffic AS(SELECT date_bin(make_interval(mins=>$3),created_at,$1::timestamptz) AS time,count(*) FILTER(WHERE kind='page_view') AS views,count(*) FILTER(WHERE kind IN ('click','contact_click')) AS clicks FROM analytics_events WHERE created_at >= $1 AND created_at<$2 GROUP BY 1), leads AS(SELECT date_bin(make_interval(mins=>$3),created_at,$1::timestamptz) AS time,count(*) AS submissions FROM inquiries WHERE created_at >= $1 AND created_at<$2 GROUP BY 1) SELECT b.time,coalesce(t.views,0),coalesce(t.clicks,0),coalesce(l.submissions,0) FROM buckets b LEFT JOIN traffic t USING(time) LEFT JOIN leads l USING(time) ORDER BY b.time`, start, now, bucket)
	if e != nil {
		return d, e
	}
	for rows.Next() {
		var p analytics.Point
		if e = rows.Scan(&p.Time, &p.Views, &p.Clicks, &p.Submissions); e != nil {
			rows.Close()
			return d, e
		}
		d.Series = append(d.Series, p)
	}
	if e = rows.Err(); e != nil {
		rows.Close()
		return d, e
	}
	rows.Close()
	rows, e = tx.Query(ctx, `SELECT path,count(*) FILTER(WHERE kind='page_view'),count(*) FILTER(WHERE kind IN ('click','contact_click')) FROM analytics_events WHERE created_at >= $1 AND created_at<$2 GROUP BY path ORDER BY 2 DESC,3 DESC LIMIT 10`, start, now)
	if e != nil {
		return d, e
	}
	for rows.Next() {
		var p analytics.TopPage
		if e = rows.Scan(&p.Path, &p.Views, &p.Clicks); e != nil {
			rows.Close()
			return d, e
		}
		d.Pages = append(d.Pages, p)
	}
	if e = rows.Err(); e != nil {
		rows.Close()
		return d, e
	}
	rows.Close()
	rows, e = tx.Query(ctx, `SELECT extract(isodow FROM created_at AT TIME ZONE 'Asia/Shanghai')::int,extract(hour FROM created_at AT TIME ZONE 'Asia/Shanghai')::int,count(*) FROM analytics_events WHERE created_at >= $1 AND created_at<$2 AND kind='page_view' GROUP BY 1,2`, start, now)
	if e != nil {
		return d, e
	}
	for rows.Next() {
		var h analytics.Heat
		if e = rows.Scan(&h.Day, &h.Hour, &h.Views); e != nil {
			rows.Close()
			return d, e
		}
		d.Heatmap = append(d.Heatmap, h)
	}
	if e = rows.Err(); e != nil {
		rows.Close()
		return d, e
	}
	rows.Close()
	return d, tx.Commit(ctx)
}
