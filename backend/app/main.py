from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.database import Base, engine

# ========================================
# DATABASE MODELS
# ========================================

from app.models.crew import Crew
from app.models.measurement import Measurement
from app.models.medical_record import MedicalRecord
from app.models.wellness import WellnessCheckin


# ========================================
# API ROUTERS
# ========================================

from app.api.crew import router as crew_router
from app.api.measurements import router as measurements_router
from app.api.medical_records import router as medical_records_router
from app.api.wellness import router as wellness_router


# ========================================
# DATABASE INITIALIZATION
# ========================================

Base.metadata.create_all(bind=engine)


# ========================================
# FASTAPI APPLICATION
# ========================================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="COSMOCURA - Astronaut Health Intelligence System"
)


# ========================================
# CORS CONFIGURATION
# ========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ========================================
# REGISTER API ROUTERS
# ========================================

app.include_router(crew_router, prefix="/api")
app.include_router(measurements_router, prefix="/api")
app.include_router(medical_records_router, prefix="/api")
app.include_router(wellness_router, prefix="/api")


# ========================================
# ROOT ENDPOINT
# ========================================

@app.get("/")
def root():
    return {
        "project": "COSMOCURA",
        "system": "Astronaut Health Intelligence System",
        "status": "operational",
        "version": settings.APP_VERSION
    }


# ========================================
# SYSTEM HEALTH CHECK
# ========================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "COSMOCURA API",
        "database": "SQLite connected"
    }