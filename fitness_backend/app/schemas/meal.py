from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel

from app.schemas.food import FoodResponse


class MealLogCreate(BaseModel):
    food_id: int
    date: date
    meal_type: Literal["breakfast", "lunch", "dinner", "snack"]
    quantity_g: float
    notes: Optional[str] = None


class MealLogResponse(BaseModel):
    id: int
    food_id: int
    date: date
    meal_type: str
    quantity_g: float
    calories: float
    protein: float
    carbs: float
    fat: float
    notes: Optional[str]
    food: FoodResponse

    model_config = {"from_attributes": True}


class DailySummary(BaseModel):
    date: date
    total_calories: float
    total_protein: float
    total_carbs: float
    total_fat: float
    goal_calories: Optional[int]
    logs: list[MealLogResponse]
