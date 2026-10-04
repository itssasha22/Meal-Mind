from datetime import date
from sqlalchemy import Boolean, Column, Date, Enum, Float, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(Enum("male", "female", "other", name="gender_enum"), nullable=True)
    height_cm = Column(Float, nullable=True)
    weight_kg = Column(Float, nullable=True)
    goal = Column(
        Enum("lose_weight", "maintain", "gain_muscle", name="goal_enum"),
        nullable=True,
    )
    activity_level = Column(
        Enum("sedentary", "light", "moderate", "active", "very_active", name="activity_enum"),
        nullable=True,
    )
    daily_calorie_goal = Column(Integer, nullable=True)
    is_active = Column(Boolean, default=True)
    streak_count = Column(Integer, default=0)
    last_log_date = Column(Date, nullable=True)

    meal_logs = relationship("MealLog", back_populates="user", cascade="all, delete-orphan")
    progress_logs = relationship("ProgressLog", back_populates="user", cascade="all, delete-orphan")
    health_logs = relationship("HealthLog", back_populates="user", cascade="all, delete-orphan")
    menstrual_logs = relationship("MenstrualLog", back_populates="user", cascade="all, delete-orphan")
    badges = relationship("UserBadge", back_populates="user", cascade="all, delete-orphan")
