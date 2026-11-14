from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MedicalRecordCreate(BaseModel):
    crew_id: int = Field(gt=0)
    category: str = Field(min_length=2, max_length=50)
    title: str = Field(min_length=2, max_length=100)
    details: str = Field(min_length=1, max_length=5000)
    source: str = Field(default="Manual entry", max_length=100)
    status: str = Field(default="Routine", max_length=30)


class MedicalRecordResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    crew_id: int
    category: str
    title: str
    details: str
    source: str
    status: str
    recorded_at: datetime