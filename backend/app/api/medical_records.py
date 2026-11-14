from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.crew import Crew
from app.models.medical_record import MedicalRecord
from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordResponse
)


router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"]
)


@router.get("/", response_model=list[MedicalRecordResponse])
def get_medical_records(
    crew_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(MedicalRecord)

    if crew_id is not None:
        query = query.filter(
            MedicalRecord.crew_id == crew_id
        )

    return query.order_by(
        MedicalRecord.recorded_at.desc()
    ).all()


@router.post(
    "/",
    response_model=MedicalRecordResponse,
    status_code=201
)
def create_medical_record(
    record_data: MedicalRecordCreate,
    db: Session = Depends(get_db)
):
    crew_member = db.query(Crew).filter(
        Crew.id == record_data.crew_id
    ).first()

    if not crew_member:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found"
        )

    record = MedicalRecord(
        crew_id=record_data.crew_id,
        category=record_data.category,
        title=record_data.title,
        details=record_data.details,
        source=record_data.source,
        status=record_data.status
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


@router.get("/{record_id}", response_model=MedicalRecordResponse)
def get_medical_record(
    record_id: int,
    db: Session = Depends(get_db)
):
    record = db.query(MedicalRecord).filter(
        MedicalRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found"
        )

    return record