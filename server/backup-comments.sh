#!/usr/bin/env sh
set -eu

timestamp=$(date -u +%Y%m%dT%H%M%SZ)
docker compose exec -T comments-api node server/backup-comments.mjs /data/comments.sqlite "/backups/comments-${timestamp}.sqlite"
find server/backups -type f -name 'comments-*.sqlite' -mtime +30 -delete
