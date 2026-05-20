from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.cars_data import CARS_DATA

app = FastAPI()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://d1m68rrd1mp2k5.cloudfront.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to the Indian Car Guide API"}


@app.get("/api/cars")
def get_cars():
    return CARS_DATA
