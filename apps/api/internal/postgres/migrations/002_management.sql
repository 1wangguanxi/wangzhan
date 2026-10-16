CREATE TABLE admin_users (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 email text NOT NULL UNIQUE,
 name text NOT NULL,
 password_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE admin_sessions (
 token_hash text PRIMARY KEY,
 user_id bigint NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
 expires_at timestamptz NOT NULL
);
CREATE INDEX admin_sessions_expiry ON admin_sessions(expires_at);
ALTER TABLE inquiries ADD COLUMN contact varchar(160) NOT NULL DEFAULT '';
ALTER TABLE inquiries ADD COLUMN session_id text NOT NULL DEFAULT '';
ALTER TABLE inquiries ADD COLUMN status text NOT NULL DEFAULT 'new' CHECK(status IN ('new','following','contacted','closed'));
ALTER TABLE inquiries ADD COLUMN notes text NOT NULL DEFAULT '';
ALTER TABLE inquiries ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE INDEX inquiries_session_time ON inquiries(session_id,created_at);
CREATE TABLE media_assets (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 path text NOT NULL UNIQUE,
 name text NOT NULL,
 alt text NOT NULL DEFAULT '',
 category text NOT NULL DEFAULT '未分类',
 mime text NOT NULL,
 bytes bigint NOT NULL,
 archived boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX media_assets_page ON media_assets(archived,id DESC);
CREATE TABLE analytics_events (
 id uuid PRIMARY KEY,
 session_id uuid NOT NULL,
 kind text NOT NULL CHECK(kind IN ('page_view','click','contact_click','heartbeat')),
 path text NOT NULL,
 target text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX analytics_time ON analytics_events(created_at DESC);
CREATE INDEX analytics_session_time ON analytics_events(session_id,created_at DESC);
CREATE INDEX analytics_kind_time ON analytics_events(kind,created_at DESC);
CREATE TABLE admin_audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 user_id bigint REFERENCES admin_users(id),
 action text NOT NULL,
 subject text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
