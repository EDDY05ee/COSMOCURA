from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Text
)
from sqlalchemy.sql import func

from app.database.database import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)

    crew_id = Column(
        Integer,
        ForeignKey("crew.id"),
        nullable=False,
        index=True
    )

    metric = Column(String(100), nullable=False)
    value = Column(Float, nullable=False)
    unit = Column(String(30), nullable=False)

    source = Column(
        String(50),
        nullable=False,
        default="manual"
    )

    notes = Column(Text, nullable=True)

    recorded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )