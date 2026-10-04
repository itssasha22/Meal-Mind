from sqlalchemy import Boolean, Column, Float, Integer, String
from app.core.database import Base


class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    brand = Column(String, nullable=True)
    calories_per_100g = Column(Float, nullable=False)
    protein_per_100g = Column(Float, default=0.0)
    carbs_per_100g = Column(Float, default=0.0)
    fat_per_100g = Column(Float, default=0.0)
    fiber_per_100g = Column(Float, default=0.0)
    sugar_per_100g = Column(Float, default=0.0)
    sodium_per_100g = Column(Float, default=0.0)
    is_verified = Column(Boolean, default=False)
    created_by_user_id = Column(Integer, nullable=True)
