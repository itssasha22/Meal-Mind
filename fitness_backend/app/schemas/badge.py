from datetime import datetime
from pydantic import BaseModel


class BadgeResponse(BaseModel):
    id: int
    name: str
    description: str
    icon: str | None
    criteria_type: str
    criteria_value: int

    model_config = {"from_attributes": True}


class UserBadgeResponse(BaseModel):
    id: int
    badge: BadgeResponse
    earned_at: datetime

    model_config = {"from_attributes": True}
