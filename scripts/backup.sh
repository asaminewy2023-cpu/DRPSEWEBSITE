#!/usr/bin/env bash
# Sevp platform backup: Postgres dump + CMS media snapshot.
# Usage: bash scripts/backup.sh [--keep N]
# Env: DATABASE_URL (defaults to apps/cms/.env), PGBIN (Postgres binaries dir)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$ROOT/backups}"
KEEP_DAYS="${1:-14}"
STAMP="$(date +%Y%m%d_%H%M%S)"
RUN_DIR="$BACKUP_DIR/$STAMP"

# Load DATABASE_URL from the CMS .env if not set.
if [[ -z "${DATABASE_URL:-}" && -f "$ROOT/apps/cms/.env" ]]; then
  set +e
  DATABASE_URL="$(grep -E '^DATABASE_URL=' "$ROOT/apps/cms/.env" | head -1 | cut -d= -f2- | tr -d '"\"'"'")"
  set -e
fi
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL not set and no apps/cms/.env found." >&2
  exit 1
fi

PGBIN="${PGBIN:-/c/Program Files/PostgreSQL/18/bin}"
PG_DUMP="$PGBIN/pg_dump"
if [[ ! -f "$PG_DUMP" ]]; then
  PG_DUMP="$(command -v pg_dump || true)"
fi
if [[ -z "$PG_DUMP" ]]; then
  echo "ERROR: pg_dump not found. Set PGBIN." >&2
  exit 1
fi

# libpq rejects SQL query params like ?schema=public in the URI.
PG_URL="${DATABASE_URL%%\?*}"

echo "[backup] $STAMP"
mkdir -p "$RUN_DIR/db" "$RUN_DIR/media"

# --- Postgres dump (custom-format, compressible, restorable via pg_restore) ---
echo "[backup] dumping database..."
if ! "$PG_DUMP" --format=custom --no-owner --no-privileges --file="$RUN_DIR/db/seed.db" "$PG_URL" 2>"$RUN_DIR/db/pg_dump.log"; then
  echo "[backup] ERROR: pg_dump failed; see $RUN_DIR/db/pg_dump.log" >&2
  exit 1
fi

# --- CMS media snapshot ---
echo "[backup] copying CMS media..."
if [[ -d "$ROOT/apps/cms/media" ]]; then
  cp -R "$ROOT/apps/cms/media/." "$RUN_DIR/media/"
fi

# --- Manifest ---
cat > "$RUN_DIR/MANIFEST.txt" <<EOF
Sevp backup
Timestamp: $STAMP
Database: custom-format dump at db/seed.db
Media: apps/cms/media snapshot under media/
Size: $(du -sh "$RUN_DIR" | cut -f1)
EOF

echo "[backup] wrote $RUN_DIR"

# --- Retention: prune backups older than $KEEP_DAYS ---
echo "[backup] pruning backups older than $KEEP_DAYS day(s)..."
if command -v find >/dev/null 2>&1; then
  find "$BACKUP_DIR" -mindepth 1 -maxdepth 1 -type d -name "2*" -mtime "+$KEEP_DAYS" -print
  find "$BACKUP_DIR" -mindepth 1 -maxdepth 1 -type d -name "2*" -mtime "+$KEEP_DAYS" -exec rm -rf {} \;
fi

echo "[backup] done."