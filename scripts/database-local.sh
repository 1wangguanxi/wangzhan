#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .runtime
PG_BIN="$(pg_config --bindir)"
if [[ ! -s .runtime/postgres/PG_VERSION ]]; then
  printf '%s\n' 'zhiyu_local' > .runtime/postgres-password
  chmod 600 .runtime/postgres-password
  "$PG_BIN/initdb" -D .runtime/postgres -U zhiyu --locale=C --encoding=UTF8 --auth-host=scram-sha-256 --auth-local=trust --pwfile=.runtime/postgres-password > .runtime/initdb.log
fi
if ! "$PG_BIN/pg_ctl" -D .runtime/postgres status >/dev/null 2>&1; then
  "$PG_BIN/pg_ctl" -D .runtime/postgres -l .runtime/postgres.log -o "-p 55432 -h 127.0.0.1 -c unix_socket_directories=''" start
fi
export PGPASSWORD=zhiyu_local
if [[ "$("$PG_BIN/psql" -h 127.0.0.1 -p 55432 -U zhiyu -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='zhiyu'")" != 1 ]]; then
  "$PG_BIN/createdb" -h 127.0.0.1 -p 55432 -U zhiyu zhiyu
fi
export DATABASE_URL="${DATABASE_URL:-postgres://zhiyu:zhiyu_local@127.0.0.1:55432/zhiyu?sslmode=disable}"
go run ./apps/api/cmd/db -seed packages/content/snapshot.json
