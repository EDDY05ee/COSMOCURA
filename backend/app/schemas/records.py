from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class CrewCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    role: str = Field(min_length=1, max_length=100)
    callsign: str | None = None


class CrewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    role: str
    callsign: str | None
    active: bool
    created_at: datetime


class MeasurementCreate(BaseModel):
    crew_id: int
    metric: str = Field(min_length=1, max_length=50)
    value: float
    unit: str = Field(min_length=1, max_length=20)
    source: str = "manual"
    note: str | None = None


class MeasurementResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    crew_id: int
    metric: str
    value: float
    unit: str
    source: str
    note: str | None
    recorded_at: datetime