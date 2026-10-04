from datetime import date
from typing import Literal, Optional
from pydantic import BaseModel


class MenstrualLogCreate(BaseModel):
    date: date
    flow: Optional[Literal["none", "spotting", "light", "medium", "heavy"]] = None
    symptoms: Optional[str] = None
    mood: Optional[str] = None
    temperature: Optional[str] = None
    notes: Optional[str] = None


class MenstrualLogResponse(MenstrualLogCreate):
    id: int
    user_id: int

    model_config = {"from_attributes": True}


class CycleSummary(BaseModel):
    cycle_start: Optional[date]
    cycle_length_days: Optional[int]
    period_length_days: Optional[int]
    predicted_next_period: Optional[date]
