#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for name in web admin api; do
  file=".runtime/$name.pid"
  if [[ -f "$file" ]]; then
    pid="$(cat "$file")"
    command="$(ps -p "$pid" -o command= 2>/dev/null || true)"
    if [[ "$command" == *"node_modules/next/dist/bin/next"*"apps/"* || "$command" == *"next-server"* || "$command" == *".runtime/zhiyu-api"* ]]; then
      kill "$pid"
    fi
    rm -f "$file"
  fi
done
if [[ -f .runtime/postgres/PG_VERSION ]]; then
  "$(pg_config --bindir)/pg_ctl" -D .runtime/postgres stop -m fast
fi
