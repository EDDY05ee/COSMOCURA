from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.crew import Crew
from app.models.measurement import Measurement
from app.models.medical_record import MedicalRecord
from app.models.wellness import WellnessCheckin

from app.schemas.crew import (
    CrewCreate,
    CrewUpdate,
    CrewResponse,
)

router = APIRouter(prefix="/crew", tags=["Crew"])


# GET ALL CREW MEMBERS
@router.get("/", response_model=list[CrewResponse])
def get_crew(db: Session = Depends(get_db)):
    return db.query(Crew).order_by(Crew.id).all()


# ADD A CREW MEMBER
@router.post("/", response_model=CrewResponse, status_code=201)
def create_crew(
    crew_data: CrewCreate,
    db: Session = Depends(get_db),
):
    crew_member = Crew(
        name=crew_data.name.strip(),
        role=crew_data.role.strip(),
        mission_status=crew_data.mission_status.strip(),
    )

    db.add(crew_member)
    db.commit()
    db.refresh(crew_member)

    return crew_member


# GET ONE CREW MEMBER
@router.get("/{crew_id}", response_model=CrewResponse)
def get_crew_member(
    crew_id: int,
    db: Session = Depends(get_db),
):
    crew_member = (
        db.query(Crew)
        .filter(Crew.id == crew_id)
        .first()
    )

    if not crew_member:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found",
        )

    return crew_member


# UPDATE A CREW MEMBER
@router.put("/{crew_id}", response_model=CrewResponse)
def update_crew_member(
    crew_id: int,
    crew_data: CrewUpdate,
    db: Session = Depends(get_db),
):
    crew_member = (
        db.query(Crew)
        .filter(Crew.id == crew_id)
        .first()
    )

    if not crew_member:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found",
        )

    update_data = crew_data.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No update information provided",
        )

    for field, value in update_data.items():
        if value is not None:
            setattr(crew_member, field, value.strip())

    db.commit()
    db.refresh(crew_member)

    return crew_member


# DELETE A CREW MEMBER SAFELY
@router.delete("/{crew_id}")
def delete_crew_member(
    crew_id: int,
    db: Session = Depends(get_db),
):
    crew_member = (
        db.query(Crew)
        .filter(Crew.id == crew_id)
        .first()
    )

    if not crew_member:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found",
        )

    has_measurements = (
        db.query(Measurement)
        .filter(Measurement.crew_id == crew_id)
        .first()
    )

    has_medical_records = (
        db.query(MedicalRecord)
        .filter(MedicalRecord.crew_id == crew_id)
        .first()
    )

    has_wellness_records = (
        db.query(WellnessCheckin)
        .filter(WellnessCheckin.crew_id == crew_id)
        .first()
    )

    if (
        has_measurements
        or has_medical_records
        or has_wellness_records
    ):
        raise HTTPException(
            status_code=409,
            detail=(
                "This crew member has linked health records. "
                "Deletion is blocked to protect medical history. "
                "Change the mission status to Inactive instead."
            ),
        )

    db.delete(crew_member)
    db.commit()

    return {
        "message": "Crew member deleted successfully",
        "crew_id": crew_id,
    }