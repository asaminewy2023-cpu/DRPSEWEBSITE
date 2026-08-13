# Monitoring

Local-dev monitoring for the Sevp platform: health checks, logs, and backups.

## Health checks

Two public endpoints:

- **CMS** — `http://localhost:3000/api/health`
  (`apps/cms/app/api/health/route.ts`). Checks database connectivity via a
  Payload query. Returns `200 { status: "ok", database: "connected" }` or
  `503` when the DB is unreachable.
- **Website** — `http://localhost:3001/health`
  (`apps/website/src/app/health/route.ts`). Probes the CMS health endpoint
  (5s timeout) and reports CMS reachability, latency, and the CMS's own DB
  status. Returns `200` when healthy, `503` when degraded.

Both are `force-dynamic` so they always reflect live state.

## Monitor script

`bash scripts/monitor.sh` (or `pnpm monitor`):

1. Probes `CMS_URL` (default `http://localhost:3000/api/health`).
2. Probes the website root (`WEB_URL`, default `http://localhost:3001/`).
3. Confirms database connectivity through the website `/health` endpoint.
4. Appends a timestamped line to `logs/monitor.log` on every run
   (`RESULT ok` or `RESULT WARNING: <list of dead services>`).
5. Prunes `logs/` files older than `MONITOR_LOG_KEEP_DAYS` (default 30).
6. Exit code: `0` = all healthy, `1` = at least one check failed
   (usable in cron / Windows Task Scheduler).

Env overrides: `CMS_URL`, `WEB_URL`, `LOG_DIR`, `MONITOR_LOG_KEEP_DAYS`.

## Backup script

`bash scripts/backup.sh [--keep N]` (or `pnpm backup`):

1. Reads `DATABASE_URL` (from `apps/cms/.env` if not exported).
2. Dumps the Postgres database with `pg_dump` in **custom format** (gzip
   compressed, restorable) into `backups/<timestamp>/db/seed.db`.
   `?schema=` query params are stripped because libpq rejects them.
3. Snapshots `apps/cms/media/` into `backups/<timestamp>/media/`.
4. Writes a `MANIFEST.txt` (timestamp, contents, size).
5. Prunes backup folders older than the retention window
   (`--keep N`, default 14 days).

Restore a dump:

```bash
pg_restore --dbname=Sevp --clean --if-exists backups/<timestamp>/db/seed.db
```

Env overrides: `DATABASE_URL`, `PGBIN` (default
`/c/Program Files/PostgreSQL/18/bin`), `BACKUP_DIR` (default `backups/`).

## Logs

- `logs/monitor.log` — monitor run results (ignored by git).
- `logs/cms/`, `logs/website/` — reserved for per-app log files.
- Retention: the monitor script prunes log files after 30 days.
- `backups/` and runtime log files are git-ignored; only `.gitkeep` files
  are committed so the folders exist.

## Scheduling

- **Windows Task Scheduler** — register once with
  `powershell -ExecutionPolicy Bypass -File scripts/schedule-tasks.ps1`.
  Creates three tasks:
  - `Sevp-Monitor` every 5 minutes (`scripts/monitor.sh`).
  - `Sevp-Backup` nightly at 02:00 (`scripts/backup.sh`).
  - `Sevp-Start` at logon (`pnpm run dev`).
  Remove them with the `-Remove` switch. Env overrides: `SEVP_ROOT`,
  `SEVP_USER`, `SEVP_PASS`.
- **Linux cron** —
  `*/5 * * * * bash /path/scripts/monitor.sh`,
  `0 2 * * * bash /path/scripts/backup.sh`.

## On-demand cache revalidation

The website caches CMS content with ISR (see `docs/ARCHITECTURE.md`). To push
edits through immediately, tag-based revalidation is wired up:

1. Every CMS fetch in `packages/shared/src/cms.ts` is tagged `cms`.
2. `apps/website/src/app/api/revalidate/route.ts` exposes
   `/api/revalidate?secret=...&tag=cms`, guarded by `REVALIDATE_SECRET`
   (must match `apps/website/.env`).
3. `apps/cms/lib/revalidate.ts` hooks into every content collection (except
   `users` / `media`) and pings the website on create/update using
   `WEBSITE_BASE_URL` + `REVALIDATE_SECRET` from `apps/cms/.env`.

Verify manually:

```bash
curl "http://localhost:3001/api/revalidate?secret=YOUR_SECRET&tag=cms"
```
