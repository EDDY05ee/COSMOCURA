from pydantic import BaseModel, ConfigDict, Field


class CrewCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    role: str = Field(default="Crew Member", max_length=100)
    mission_status: str = Field(default="Active", max_length=50)


class CrewUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    role: str | None = Field(default=None, min_length=2, max_length=100)
    mission_status: str | None = Field(default=None, min_length=2, max_length=50)


class CrewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    role: str
    mission_status: str