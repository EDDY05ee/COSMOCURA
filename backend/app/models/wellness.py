from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func

from app.database.database import Base


class WellnessCheckin(Base):
    __tablename__ = "wellness_checkins"

    id = Column(Integer, primary_key=True, index=True)

    crew_id = Column(
        Integer,
        ForeignKey("crew.id"),
        nullable=False,
        index=True
    )

    sleep = Column(Float, nullable=False)
    mood = Column(String(30), nullable=False)
    stress = Column(Integer, nullable=False)
    fatigue = Column(Integer, nullable=False)

    note = Column(Text, nullable=True)

    recorded_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )