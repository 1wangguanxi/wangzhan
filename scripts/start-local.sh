#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .runtime
export DATABASE_URL="${DATABASE_URL:-postgres://zhiyu:zhiyu_local@127.0.0.1:55432/zhiyu?sslmode=disable}"
export API_ADDR="${API_ADDR:-127.0.0.1:8080}"
export CONTENT_API_URL="${CONTENT_API_URL:-http://$API_ADDR}"
api_ready() {
  curl -fsS "$CONTENT_API_URL/healthz" >/dev/null 2>&1 &&
    curl -fsS "$CONTENT_API_URL/v1/catalog" >/dev/null 2>&1
}
if curl -fsS "$CONTENT_API_URL/healthz" >/dev/null 2>&1 && ! api_ready; then
  printf '%s\n' "API address is occupied by a different or incompatible service: $CONTENT_API_URL. Set API_ADDR to a free local port." >&2
  exit 1
fi
web_mode="${WEB_MODE:-dev}"
if [[ "$web_mode" != dev && "$web_mode" != start ]]; then
  printf '%s\n' 'WEB_MODE must be dev or start' >&2
  exit 1
fi
bash scripts/database-local.sh
bash scripts/admin-local.sh
go build -trimpath -o .runtime/zhiyu-api ./apps/api/cmd/server
if ! api_ready; then
  nohup .runtime/zhiyu-api </dev/null > .runtime/api.log 2>&1 &
  echo $! > .runtime/api.pid
fi
if ! curl -fsS http://127.0.0.1:3000/ >/dev/null 2>&1; then
  nohup node node_modules/next/dist/bin/next "$web_mode" apps/web --hostname 127.0.0.1 --port 3000 </dev/null > .runtime/web.log 2>&1 &
  echo $! > .runtime/web.pid
fi
if ! curl -fsS http://127.0.0.1:3001/login >/dev/null 2>&1; then
  nohup node node_modules/next/dist/bin/next "$web_mode" apps/admin --hostname 127.0.0.1 --port 3001 </dev/null > .runtime/admin.log 2>&1 &
  echo $! > .runtime/admin.pid
fi
for attempt in {1..30}; do
  if api_ready && curl -fsS http://127.0.0.1:3000/ >/dev/null 2>&1 && curl -fsS http://127.0.0.1:3001/login >/dev/null 2>&1; then break; fi
  sleep 1
done
api_ready
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS http://127.0.0.1:3001/login >/dev/null
printf '%s\n' 'Web: http://localhost:3000/cases.html#schools' 'Admin: http://127.0.0.1:3001' 'Admin credentials: .runtime/admin-credentials.txt' "API: $CONTENT_API_URL/healthz" 'Logs: .runtime/web.log and .runtime/api.log'
