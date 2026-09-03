#!/bin/sh
set -eu
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"
# :8081 is QA-only — a revive must never inherit a stale built-output preview.
# Called directly, not via npm: no node_modules needed, so nothing to wait for.
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

# Recover from a stale dev server that still owns the port but returns an error.
STALE_PIDS="$(lsof -ti tcp:8080 2>/dev/null || true)"
if [ -n "$STALE_PIDS" ]; then
  kill $STALE_PIDS 2>/dev/null || true
fi

npm run dev >>/tmp/app-startup.log 2>&1 &
