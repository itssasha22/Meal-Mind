from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[Literal["male", "female", "other"]] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    goal: Optional[Literal["lose_weight", "maintain", "gain_muscle"]] = None
    activity_level: Optional[Literal["sedentary", "light", "moderate", "active", "very_active"]] = None
    daily_calorie_goal: Optional[int] = None


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    full_name: Optional[str]
    date_of_birth: Optional[date]
    gender: Optional[str]
    height_cm: Optional[float]
    weight_kg: Optional[float]
    goal: Optional[str]
    activity_level: Optional[str]
    daily_calorie_goal: Optional[int]
    streak_count: int

    model_config = {"from_attributes": True}
