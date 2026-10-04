from typing import Optional
from pydantic import BaseModel


class FoodCreate(BaseModel):
    name: str
    brand: Optional[str] = None
    calories_per_100g: float
    protein_per_100g: float = 0.0
    carbs_per_100g: float = 0.0
    fat_per_100g: float = 0.0
    fiber_per_100g: float = 0.0
    sugar_per_100g: float = 0.0
    sodium_per_100g: float = 0.0


class FoodResponse(FoodCreate):
    id: int
    is_verified: bool

    model_config = {"from_attributes": True}
