from datetime import datetime, timezone

from sqlalchemy import (
    Boolean, Column, DateTime, Float,
    ForeignKey, Integer, String
)
from sqlalchemy.orm import relationship

from app.database.database import Base


class CrewMember(Base):
    __tablename__ = "crew_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    callsign = Column(String(50), nullable=True)
    active = Column(Boolean, default=True)
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    measurements = relationship(
        "HealthMeasurement",
        back_populates="crew_member",
        cascade="all, delete-orphan"
    )


class HealthMeasurement(Base):
    __tablename__ = "health_measurements"

    id = Column(Integer, primary_key=True, index=True)
    crew_id = Column(
        Integer,
        ForeignKey("crew_members.id"),
        nullable=False
    )
    metric = Column(String(50), nullable=False)
    value = Column(Float, nullable=False)
    unit = Column(String(20), nullable=False)
    source = Column(String(50), default="manual")
    note = Column(String(500), nullable=True)
    recorded_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    crew_member = relationship(
        "CrewMember",
        back_populates="measurements"
    )