from sqlalchemy import Column, Date, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class MenstrualLog(Base):
    __tablename__ = "menstrual_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    flow = Column(
        Enum("none", "spotting", "light", "medium", "heavy", name="flow_enum"),
        nullable=True,
    )
    symptoms = Column(String, nullable=True)  # comma-separated list
    mood = Column(String, nullable=True)
    temperature = Column(String, nullable=True)  # basal body temperature string
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="menstrual_logs")
