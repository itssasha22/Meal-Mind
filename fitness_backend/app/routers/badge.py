from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.badge import UserBadgeResponse
from app.services.badge_service import seed_badges

router = APIRouter()


@router.get("/", response_model=list[UserBadgeResponse])
def get_my_badges(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Ensure default badges exist
    seed_badges(db)
    return current_user.badges


@router.post("/seed", status_code=201)
def seed(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    """Manually trigger badge seeding (useful for initial setup)."""
    seed_badges(db)
    return {"message": "Badges seeded successfully"}
