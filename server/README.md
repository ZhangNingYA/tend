# Tend comments service

The comments service keeps public reads separate from the two-person write session.
It uses Node's built-in SQLite support, so the production image has no native database dependency.

## First-time setup

Generate two password hashes on the server.

```sh
node server/hash-password.mjs "first long passphrase"
node server/hash-password.mjs "second long passphrase"
```

Copy `server/.env.example` to `server/.env`, add the two hashes, and choose the two display names.
The `.env` file stays outside Git.

Start the full stack from the repository root.

```sh
docker compose up -d --build
curl http://127.0.0.1:13101/api/health
```

The web container serves the Astro build and proxies `/api` to the comments container.
The SQLite file is mounted at `server/data/comments.sqlite` and backups can be created with
`server/backup-comments.sh`.
