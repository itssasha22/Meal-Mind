from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class ProgressLog(Base):
    __tablename__ = "progress_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    weight_kg = Column(Float, nullable=True)
    body_fat_percentage = Column(Float, nullable=True)
    waist_cm = Column(Float, nullable=True)
    chest_cm = Column(Float, nullable=True)
    hips_cm = Column(Float, nullable=True)
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="progress_logs")
