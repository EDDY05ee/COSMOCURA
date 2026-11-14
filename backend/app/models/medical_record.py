from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func

from app.database.database import Base


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)

    crew_id = Column(
        Integer,
        ForeignKey("crew.id"),
        nullable=False,
        index=True
    )

    category = Column(String(50), nullable=False)
    title = Column(String(100), nullable=False)
    details = Column(Text, nullable=False)
    source = Column(String(100), nullable=False, default="Manual entry")
    status = Column(String(30), nullable=False, default="Routine")

    recorded_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )