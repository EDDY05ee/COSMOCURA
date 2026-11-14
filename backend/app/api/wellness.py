from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.crew import Crew
from app.models.wellness import WellnessCheckin
from app.schemas.wellness import (
    WellnessCheckinCreate,
    WellnessCheckinResponse
)


router = APIRouter(
    prefix="/wellness",
    tags=["Crew Wellness"]
)


@router.get("/", response_model=list[WellnessCheckinResponse])
def get_wellness_checkins(
    crew_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(WellnessCheckin)

    if crew_id is not None:
        query = query.filter(
            WellnessCheckin.crew_id == crew_id
        )

    return query.order_by(
        WellnessCheckin.recorded_at.desc()
    ).all()


@router.post(
    "/",
    response_model=WellnessCheckinResponse,
    status_code=201
)
def create_wellness_checkin(
    checkin_data: WellnessCheckinCreate,
    db: Session = Depends(get_db)
):
    crew_member = db.query(Crew).filter(
        Crew.id == checkin_data.crew_id
    ).first()

    if not crew_member:
        raise HTTPException(
            status_code=404,
            detail="Crew member not found"
        )

    checkin = WellnessCheckin(
        crew_id=checkin_data.crew_id,
        sleep=checkin_data.sleep,
        mood=checkin_data.mood,
        stress=checkin_data.stress,
        fatigue=checkin_data.fatigue,
        note=checkin_data.note
    )

    db.add(checkin)
    db.commit()
    db.refresh(checkin)

    return checkin


@router.get(
    "/{checkin_id}",
    response_model=WellnessCheckinResponse
)
def get_wellness_checkin(
    checkin_id: int,
    db: Session = Depends(get_db)
):
    checkin = db.query(WellnessCheckin).filter(
        WellnessCheckin.id == checkin_id
    ).first()

    if not checkin:
        raise HTTPException(
            status_code=404,
            detail="Wellness check-in not found"
        )

    return checkin