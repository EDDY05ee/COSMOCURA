from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.records import CrewMember, HealthMeasurement
from app.schemas.records import (
    CrewCreate,
    CrewResponse,
    MeasurementCreate,
    MeasurementResponse
)

router = APIRouter(prefix="/api", tags=["Crew and Health Records"])


@router.get("/crew", response_model=list[CrewResponse])
def get_crew(db: Session = Depends(get_db)):
    return db.query(CrewMember).order_by(CrewMember.id).all()


@router.post("/crew", response_model=CrewResponse, status_code=201)
def create_crew(data: CrewCreate, db: Session = Depends(get_db)):
    member = CrewMember(**data.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


@router.get(
    "/measurements",
    response_model=list[MeasurementResponse]
)
def get_measurements(
    crew_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(HealthMeasurement)

    if crew_id is not None:
        query = query.filter(HealthMeasurement.crew_id == crew_id)

    return query.order_by(
        HealthMeasurement.recorded_at.desc()
    ).all()


@router.post(
    "/measurements",
    response_model=MeasurementResponse,
    status_code=201
)
def create_measurement(
    data: MeasurementCreate,
    db: Session = Depends(get_db)
):
    member = db.query(CrewMember).filter(
        CrewMember.id == data.crew_id
    ).first()

    if member is None:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found"
        )

    measurement = HealthMeasurement(**data.model_dump())
    db.add(measurement)
    db.commit()
    db.refresh(measurement)

    return measurement