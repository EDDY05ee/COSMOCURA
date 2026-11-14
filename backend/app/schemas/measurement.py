from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MeasurementCreate(BaseModel):
    crew_id: int = Field(gt=0)
    metric: str = Field(min_length=2, max_length=100)
    value: float
    unit: str = Field(min_length=1, max_length=30)
    source: str = Field(
        default="manual",
        max_length=50
    )
    notes: str | None = None


class MeasurementResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    crew_id: int
    metric: str
    value: float
    unit: str
    source: str
    notes: str | None
    recorded_at: datetime | None