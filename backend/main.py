import subprocess
import json
import os
from urllib.parse import unquote

import redis
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database.cars_data import CARS_DATA
from database.car_metadata import CAR_META

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://d1m68rrd1mp2k5.cloudfront.net", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Redis client ──────────────────────────────────────────────────────────────
# Set REDIS_URL env var on EC2 to point at a managed Redis instance, or leave
# unset to use localhost (default after: sudo apt install redis-server).
_REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
CACHE_TTL = int(os.getenv("CACHE_TTL", 86400))  # seconds; override via env

try:
    _r = redis.from_url(
        _REDIS_URL,
        decode_responses=True,
        socket_timeout=2,
        socket_connect_timeout=2,
    )
    _r.ping()
    print(f"✅ Redis connected → {_REDIS_URL}  (TTL={CACHE_TTL}s)")
except Exception as exc:
    print(f"⚠️  Redis unavailable ({exc}) — running without cache")
    _r = None


def _cache_get(key: str):
    if not _r:
        return None
    try:
        raw = _r.get(key)
        return json.loads(raw) if raw else None
    except Exception as exc:
        print(f"⚠️  Redis GET error ({exc})")
        return None


def _cache_set(key: str, value):
    if not _r:
        return
    try:
        _r.setex(key, CACHE_TTL, json.dumps(value))
    except Exception as exc:
        print(f"⚠️  Redis SET error ({exc})")


def _cache_delete(*keys: str):
    if not _r:
        return
    try:
        deleted = [k for k in keys if _r.delete(k)]
        if deleted:
            print(f"🗑️  Cache invalidated → {deleted}")
    except Exception as exc:
        print(f"⚠️  Redis DEL error ({exc})")


# ── Data (built once at startup) ──────────────────────────────────────────────
_CARS_WITH_META = [{**car, **CAR_META.get(car['model_name'], {})} for car in CARS_DATA]


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Welcome to the Indian Car Guide API"}


@app.get("/api/version")
def version():
    try:
        sha = subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"],
            cwd="/home/ubuntu/app",
            stderr=subprocess.DEVNULL,
            text=True,
        ).strip()
    except Exception:
        sha = "unknown"
    return {"commit": sha, "cars": len(CARS_DATA)}


@app.get("/api/cars")
def get_cars():
    key = "cars:all"
    cached = _cache_get(key)
    if cached is not None:
        print("⚡ Cache Hit  → cars:all")
        return cached

    print("❌ Cache Miss → cars:all  (storing in Redis)")
    _cache_set(key, _CARS_WITH_META)
    return _CARS_WITH_META


@app.get("/api/cars/{model_name}")
def get_car(model_name: str):
    model_name = unquote(model_name)
    key = f"cars:model:{model_name.lower()}"

    cached = _cache_get(key)
    if cached is not None:
        print(f"⚡ Cache Hit  → {key}")
        return cached

    print(f"❌ Cache Miss → {key}  (storing in Redis)")
    variants = [c for c in _CARS_WITH_META if c.get("model_name") == model_name]
    if not variants:
        raise HTTPException(status_code=404, detail=f"Model '{model_name}' not found")

    _cache_set(key, variants)
    return variants
