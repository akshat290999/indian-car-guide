#!/usr/bin/env bash
# Start FastAPI backend and Vite frontend together for local development.
# Usage: ./dev.sh
# Stop:  Ctrl+C (kills both processes)

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

# ── Backend ───────────────────────────────────────────────────────────────────
VENV="$ROOT/backend/venv"
if [ ! -d "$VENV" ]; then
  echo "No venv found at $VENV. Create one with:"
  echo "  cd backend && python3 -m venv venv && venv/bin/pip install -r requirements.txt"
  exit 1
fi

echo "Starting FastAPI on http://localhost:8000 …"
cd "$ROOT/backend"
"$VENV/bin/uvicorn" main:app --host 127.0.0.1 --port 8000 --reload &
BACKEND_PID=$!

# ── Frontend ──────────────────────────────────────────────────────────────────
echo "Starting Vite on http://localhost:5173 …"
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

# ── Cleanup on Ctrl+C ─────────────────────────────────────────────────────────
trap "echo 'Stopping…'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM

echo ""
echo "  Frontend  →  http://localhost:5173"
echo "  API       →  http://localhost:8000/api/cars"
echo "  Press Ctrl+C to stop both."
echo ""

wait
