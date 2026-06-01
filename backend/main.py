import subprocess
from fastapi import FastAPI
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

# Merge per-model metadata into each trim record once at startup
_CARS_WITH_META = [{**car, **CAR_META.get(car['model_name'], {})} for car in CARS_DATA]


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
    return _CARS_WITH_META
