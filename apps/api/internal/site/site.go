// Package site owns public content and the inquiry contract, independent of HTTP and SQL.
package site

import (
	"context"
	"encoding/json"
	"errors"
	"regexp"
	"strings"
	"time"
	"unicode/utf8"
)

type Catalog map[string]json.RawMessage
type Inquiry struct {
	Name      string `json:"name"`
	Contact   string `json:"contact,omitempty"`
	SessionID string `json:"sessionId,omitempty"`
	School    string `json:"school"`
	Major     string `json:"major"`
	Deadline  string `json:"deadline"`
	Message   string `json:"message"`
}

var ErrConflict = errors.New("idempotency key reused with different data")

type Store interface {
	Catalog(context.Context) (Catalog, error)
	SaveInquiry(context.Context, string, Inquiry) (int64, error)
	Ping(context.Context) error
}

var namePattern = regexp.MustCompile(`[\p{Han}A-Za-z0-9]`)
var KeyPattern = regexp.MustCompile(`^[a-zA-Z0-9-]{16,80}$`)

func (i *Inquiry) Validate(now time.Time) map[string]string {
	i.Name = strings.TrimSpace(i.Name)
	i.School = strings.TrimSpace(i.School)
	i.Major = strings.TrimSpace(i.Major)
	i.Message = strings.TrimSpace(i.Message)
	fields := map[string]string{}
	i.Contact = strings.TrimSpace(i.Contact)
	if utf8.RuneCountInString(i.Contact) > 160 {
		fields["contact"] = "联系方式不能超过160字"
	}
	if i.SessionID != "" && !regexp.MustCompile(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`).MatchString(i.SessionID) {
		fields["sessionId"] = "访问标识格式不正确"
	}
	for _, v := range []struct {
		key, value string
		min, max   int
	}{{"name", i.Name, 2, 80}, {"school", i.School, 2, 160}, {"major", i.Major, 1, 160}, {"message", i.Message, 10, 5000}} {
		size := utf8.RuneCountInString(v.value)
		if size < v.min || size > v.max {
			fields[v.key] = "请检查内容长度，必填内容不能留空"
		}
	}
	if !namePattern.MatchString(i.Name) {
		fields["name"] = "姓名不能全是符号，请写真实称呼"
	}
	// Business dates follow the site's Chinese audience, independent of server timezone.
	location := time.FixedZone("Asia/Shanghai", 8*60*60)
	day, err := time.ParseInLocation("2006-01-02", i.Deadline, location)
	local := now.In(location)
	today := time.Date(local.Year(), local.Month(), local.Day(), 0, 0, 0, 0, location)
	if err != nil || day.Before(today) {
		fields["deadline"] = "论文截止时间不能早于今天，请检查"
	}
	return fields
}
