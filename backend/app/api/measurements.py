from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.crew import Crew
from app.models.measurement import Measurement
from app.schemas.measurement import (
    MeasurementCreate,
    MeasurementResponse
)


router = APIRouter(
    prefix="/measurements",
    tags=["Measurements"]
)


@router.get("/", response_model=list[MeasurementResponse])
def get_measurements(
    crew_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Measurement)

    if crew_id is not None:
        query = query.filter(
            Measurement.crew_id == crew_id
        )

    return query.order_by(
        Measurement.recorded_at.desc()
    ).all()


@router.post(
    "/",
    response_model=MeasurementResponse,
    status_code=201
)
def create_measurement(
    measurement_data: MeasurementCreate,
    db: Session = Depends(get_db)
):
    crew_member = db.query(Crew).filter(
        Crew.id == measurement_data.crew_id
    ).first()

    if not crew_member:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found"
        )

    measurement = Measurement(
        crew_id=measurement_data.crew_id,
        metric=measurement_data.metric,
        value=measurement_data.value,
        unit=measurement_data.unit,
        source=measurement_data.source,
        notes=measurement_data.notes
    )

    db.add(measurement)
    db.commit()
    db.refresh(measurement)

    return measurement