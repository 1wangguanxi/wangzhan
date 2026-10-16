CREATE TABLE content_items (
 collection text NOT NULL CHECK(collection IN ('cases','schools','faqs','reviews')),
 id integer NOT NULL CHECK(id>0),
 ordinal integer NOT NULL,
 payload jsonb NOT NULL CHECK(jsonb_typeof(payload)='object'),
 PRIMARY KEY(collection,id)
);
CREATE INDEX content_items_display_order ON content_items(collection,ordinal);

CREATE TABLE inquiries (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 idempotency_key varchar(80) NOT NULL UNIQUE,
 payload_hash char(64) NOT NULL,
 name varchar(80) NOT NULL CHECK(char_length(name)>=2),
 school varchar(160) NOT NULL CHECK(char_length(school)>=2),
 major varchar(160) NOT NULL CHECK(char_length(major)>=1),
 deadline date NOT NULL,
 message text NOT NULL CHECK(char_length(message) BETWEEN 10 AND 5000),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX inquiries_created_at ON inquiries(created_at DESC);
