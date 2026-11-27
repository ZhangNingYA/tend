#!/usr/bin/env sh
set -eu

node_bin=${NODE_BIN:-node}
env_file=${1:-server/.env}

printf '第一个显示名称 [我]: '
read -r first_name
first_name=${first_name:-我}
printf '第一个密码: '
stty -echo
read -r first_password
stty echo
printf '\n第二个显示名称 [猪猪]: '
read -r second_name
second_name=${second_name:-猪猪}
printf '第二个密码: '
stty -echo
read -r second_password
stty echo
printf '\n'

if [ -z "$first_password" ] || [ -z "$second_password" ]; then
  echo '密码不能为空。' >&2
  exit 1
fi

first_hash=$($node_bin server/hash-password.mjs "$first_password")
second_hash=$($node_bin server/hash-password.mjs "$second_password")
umask 077
mkdir -p "$(dirname "$env_file")"
{
  printf 'TEND_USER_ONE_NAME=%s\n' "$first_name"
  printf 'TEND_USER_ONE_PASSWORD_HASH=%s\n' "$first_hash"
  printf 'TEND_USER_TWO_NAME=%s\n' "$second_name"
  printf 'TEND_USER_TWO_PASSWORD_HASH=%s\n' "$second_hash"
  printf 'TEND_ALLOWED_ORIGIN=https://www.fulafu.com\n'
  printf 'TEND_COOKIE_SECURE=1\n'
} > "$env_file"
chmod 600 "$env_file"
echo "已写入 $env_file"
