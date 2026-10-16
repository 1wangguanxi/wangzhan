#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .runtime
if [[ ! -f .runtime/admin-password ]]; then
  (umask 077; openssl rand -hex 16 > .runtime/admin-password)
  (umask 077; { printf '后台地址：http://127.0.0.1:3001\n管理员邮箱：admin@zhiyu.local\n初始密码：'; cat .runtime/admin-password; printf '\n请登录后在账户设置中修改密码。此文件仅是首次创建的凭据。\n'; } > .runtime/admin-credentials.txt)
fi
export DATABASE_URL="${DATABASE_URL:-postgres://zhiyu:zhiyu_local@127.0.0.1:55432/zhiyu?sslmode=disable}"
go run ./apps/api/cmd/admin -password-file .runtime/admin-password
printf '%s\n' '后台管理员已初始化，登录凭据保存在 .runtime/admin-credentials.txt'
