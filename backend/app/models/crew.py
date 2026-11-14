from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Crew(Base):
    __tablename__ = "crew"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    role = Column(String(100), nullable=False, default="Crew Member")
    mission_status = Column(
        String(50),
        nullable=False,
        default="Active"
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )