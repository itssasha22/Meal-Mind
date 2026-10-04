from datetime import date
from typing import Optional
from pydantic import BaseModel


class HealthLogCreate(BaseModel):
    date: date
    steps: Optional[int] = None
    water_ml: Optional[float] = None
    sleep_hours: Optional[float] = None
    heart_rate_bpm: Optional[int] = None
    systolic_bp: Optional[int] = None
    diastolic_bp: Optional[int] = None
    mood: Optional[str] = None
    energy_level: Optional[int] = None
    notes: Optional[str] = None


class HealthLogResponse(HealthLogCreate):
    id: int
    user_id: int

    model_config = {"from_attributes": True}
