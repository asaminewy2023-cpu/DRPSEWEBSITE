#!/usr/bin/env bash
# Sevp platform monitor: health probes + logging + log retention.
# Checks CMS (/api/health), website (/), database (via website /health).
# Usage: bash scripts/monitor.sh
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="${LOG_DIR:-$ROOT/logs}"
CMS_URL="${CMS_URL:-http://localhost:3000}"
WEB_URL="${WEB_URL:-http://localhost:3001}"
KEEP_DAYS="${MONITOR_LOG_KEEP_DAYS:-30}"
STAMP="$(date '+%Y-%m-%dT%H:%M:%S')"
mkdir -p "$LOG_DIR"

log() { echo "[$STAMP] $*"; }
write_log() { echo "[$STAMP] $*" >> "$LOG_DIR/monitor.log"; }

failures=0
summary=""

# --- CMS health ---
if curl -fsS --max-time 10 "$CMS_URL/api/health" >"$LOG_DIR/.cms.json" 2>/dev/null; then
  log "OK   CMS  $CMS_URL/api/health"
else
  log "FAIL CMS  $CMS_URL/api/health"
  write_log "FAIL CMS down"
  summary="$summary cms(dead)"
  failures=$((failures + 1))
fi

# --- Website root ---
if curl -fsS --max-time 10 "$WEB_URL/" >/dev/null 2>&1; then
  log "OK   WEB  $WEB_URL/"
else
  log "FAIL WEB  $WEB_URL/"
  write_log "FAIL website down"
  summary="$summary web(dead)"
  failures=$((failures + 1))
fi

# --- Database connectivity via website /health (also confirms CMS is reachable) ---
if curl -fsS --max-time 10 "$WEB_URL/health" >"$LOG_DIR/.health.json" 2>/dev/null; then
  DB_STATE="$(sed -n 's/.*"cms"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$LOG_DIR/.health.json" 2>/dev/null || true)"
  log "OK   DB   connected (cms=$DB_STATE via $WEB_URL/health)"
else
  log "FAIL DB   $WEB_URL/health"
  write_log "FAIL website /health unreachable"
  summary="$summary health(dead)"
  failures=$((failures + 1))
fi

# --- Rotate logs: prune monitor.log + app logs after KEEP_DAYS ---
pruned=0
if command -v find >/dev/null 2>&1; then
  while IFS= read -r f; do
    rm -f "$f"
    pruned=1
  done < <(find "$LOG_DIR" -maxdepth 1 -type f -mtime "+$KEEP_DAYS" 2>/dev/null)
fi
if [[ "$pruned" -eq 1 ]]; then
  log "INFO pruned logs older than $KEEP_DAYS day(s)"
fi

rm -f "$LOG_DIR/.cms.json" "$LOG_DIR/.health.json"

# --- Result ---
if [[ "$failures" -eq 0 ]]; then
  log "RESULT all systems healthy"
  write_log "RESULT ok"
  exit 0
else
  write_log "RESULT WARNING:$summary"
  log "RESULT $failures check(s) failed:$summary"
  exit 1
fi