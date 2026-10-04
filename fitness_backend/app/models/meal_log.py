from sqlalchemy import Column, Date, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class MealLog(Base):
    __tablename__ = "meal_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    food_id = Column(Integer, ForeignKey("foods.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    meal_type = Column(
        Enum("breakfast", "lunch", "dinner", "snack", name="meal_type_enum"),
        nullable=False,
    )
    quantity_g = Column(Float, nullable=False)
    calories = Column(Float, nullable=False)
    protein = Column(Float, default=0.0)
    carbs = Column(Float, default=0.0)
    fat = Column(Float, default=0.0)
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="meal_logs")
    food = relationship("Food")
