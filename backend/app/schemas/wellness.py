from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class WellnessCheckinCreate(BaseModel):
    crew_id: int = Field(gt=0)

    sleep: float = Field(ge=0, le=24)

    mood: str = Field(
        min_length=2,
        max_length=30
    )

    stress: int = Field(ge=1, le=5)

    fatigue: int = Field(ge=1, le=5)

    note: str | None = Field(
        default=None,
        max_length=500
    )


class WellnessCheckinResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    crew_id: int
    sleep: float
    mood: str
    stress: int
    fatigue: int
    note: str | None
    recorded_at: datetime