from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class HealthLog(Base):
    __tablename__ = "health_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    steps = Column(Integer, nullable=True)
    water_ml = Column(Float, nullable=True)
    sleep_hours = Column(Float, nullable=True)
    heart_rate_bpm = Column(Integer, nullable=True)
    systolic_bp = Column(Integer, nullable=True)
    diastolic_bp = Column(Integer, nullable=True)
    mood = Column(
        String, nullable=True
    )  # e.g. great, good, okay, bad
    energy_level = Column(Integer, nullable=True)  # 1–10
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="health_logs")
