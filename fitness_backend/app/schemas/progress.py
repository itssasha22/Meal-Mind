from datetime import date
from typing import Optional
from pydantic import BaseModel


class ProgressCreate(BaseModel):
    date: date
    weight_kg: Optional[float] = None
    body_fat_percentage: Optional[float] = None
    waist_cm: Optional[float] = None
    chest_cm: Optional[float] = None
    hips_cm: Optional[float] = None
    notes: Optional[str] = None


class ProgressResponse(ProgressCreate):
    id: int
    user_id: int

    model_config = {"from_attributes": True}
