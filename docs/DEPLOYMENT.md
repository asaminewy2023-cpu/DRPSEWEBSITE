# Deployment

How to build and run the Sevp platform in production using Docker.

## Prerequisites

- Docker with Docker Compose v2.
- A Postgres database (the compose file runs one for you).
- Domain + TLS certs (for HTTPS).
- Real secrets: `PAYLOAD_SECRET`, `POSTGRES_PASSWORD`, `SMTP_USER`/`SMTP_PASS`
  (if emailing contact messages), `NEXT_PUBLIC_GA4_ID`,
  `NEXT_PUBLIC_GSC_VERIFICATION`.

## One-command startup

```bash
cd docker
cp .env.example .env   # then fill in real values
docker compose up -d --build
```

Services:

| Service  | Purpose                                  | Host port |
|----------|------------------------------------------|-----------|
| postgres | Payload database (volume `pgdata`)       | 127.0.0.1:5432 |
| cms      | Payload CMS admin + REST API             | 127.0.0.1:3000 |
| website  | Public Next.js site                      | 127.0.0.1:3001 |
| nginx    | Reverse proxy (`/admin`,`/api`→CMS, `/`→website) | 80, 443 |

Then visit `http://localhost` — admin at `http://localhost/admin`.

## Environment

The CMS container needs `DATABASE_URL` pointing at the `postgres` service:
`postgres://postgres:postgres@postgres:5432/Sevp` (values overridable via
`.env`). The website reads the CMS over the internal network
(`CMS_BASE_URL=http://cms:3000`) but publishes the **public** CMS URL to
browsers via `NEXT_PUBLIC_CMS_BASE_URL`.

### First run

1. **Create the admin user:** Payload migrations must exist before login. In the
   compose file, the CMS starts with existing migration files, so run:
   ```bash
   docker compose exec cms pnpm --filter @sevp/cms payload:migrate
   docker compose exec cms pnpm --filter @sevp/cms seed
   ```
   Or create the first admin through the admin UI's "Create First User" screen.

2. **Media volume:** uploads are stored in the `media` volume (mapped to
   `apps/cms/media`). It survives rebuilds. Back it up (see docs/MONITORING.md).

### Rotate credentials

The seed script uses dev defaults (`password123` for `admin`/`editor`/`reporter`).
**Change these before going live:**

- **Existing accounts:** log into `/admin`, go to Account, and change the
  password for each user.
- **Fresh seeds:** set `SEED_ADMIN_PASSWORD` / `SEED_EDITOR_PASSWORD` /
  `SEED_REPORTER_PASSWORD` before running `seed` so strong passwords are used.
- All passwords should be strong and unique; monitor access with the `users`
  collection timestamps.

## HTTPS (TLS)

The bundled `nginx.conf` includes commented HTTPS server blocks. Recommended:

- Use **Let's Encrypt / Certbot** with webroot or DNS-01 challenges, mount
  the certs into nginx, and uncomment the 443 server block.
- Or put the platform behind an existing TLS-terminating proxy / load balancer
  and only expose nginx on HTTP internally.

Always set `WEBSITE_URL`/`NEXT_PUBLIC_SERVER_URL` to the public HTTPS origin so
the CMS generates absolute URLs correctly.

## Updates / redeploy

```bash
docker compose up -d --build
docker compose exec cms pnpm --filter @sevp/cms payload:migrate
```

## Backups & monitoring

Use `scripts/backup.sh` (DB + media) and `scripts/monitor.sh` on the host, or
inside the containers:

```bash
docker compose exec postgres pg_dump -U postgres -Fc Sevp > backup.dump
docker compose exec cms tar -czf - /app/apps/cms/media > media.tar.gz
```
