FROM node:22-bookworm-slim

WORKDIR /app
COPY server/comments-api.mjs server/hash-password.mjs server/backup-comments.mjs ./server/

RUN mkdir -p /data

ENV NODE_ENV=production \
    TEND_HOST=0.0.0.0 \
    TEND_PORT=8787 \
    TEND_DB_PATH=/data/comments.sqlite \
    TEND_COOKIE_SECURE=1

EXPOSE 8787
CMD ["node", "server/comments-api.mjs"]
