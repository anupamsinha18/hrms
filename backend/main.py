
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routes import employee, attendance

load_dotenv()

app = FastAPI(title="HRMS Lite API", version="1.0.0")



origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://imaginative-macaron-d13858.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)

@app.get("/")
async def root():
    return {"message": "HRMS Lite API is running"}
