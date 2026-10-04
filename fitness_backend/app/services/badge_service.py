from sqlalchemy.orm import Session

from app.models.badge import Badge, UserBadge
from app.models.user import User


SEED_BADGES = [
    {
        "name": "First Step",
        "description": "Log your first meal",
        "icon": "🥗",
        "criteria_type": "meal_logs",
        "criteria_value": 1,
    },
    {
        "name": "Week Warrior",
        "description": "Maintain a 7-day streak",
        "icon": "🔥",
        "criteria_type": "streak",
        "criteria_value": 7,
    },
    {
        "name": "Month Master",
        "description": "Maintain a 30-day streak",
        "icon": "🏆",
        "criteria_type": "streak",
        "criteria_value": 30,
    },
    {
        "name": "Hydration Hero",
        "description": "Log water intake 7 days in a row",
        "icon": "💧",
        "criteria_type": "water_logs",
        "criteria_value": 7,
    },
    {
        "name": "Step Champion",
        "description": "Log 10,000 steps in a day",
        "icon": "👟",
        "criteria_type": "steps",
        "criteria_value": 10000,
    },
]


def seed_badges(db: Session) -> None:
    """Insert default badges if they don't exist yet."""
    for badge_data in SEED_BADGES:
        exists = db.query(Badge).filter(Badge.name == badge_data["name"]).first()
        if not exists:
            db.add(Badge(**badge_data))
    db.commit()


def award_badge_if_earned(db: Session, user: User, criteria_type: str, value: int) -> list[Badge]:
    """Check all badges for the given criteria and award any not yet earned."""
    earned = []
    already_earned_ids = {ub.badge_id for ub in user.badges}

    candidates = (
        db.query(Badge)
        .filter(Badge.criteria_type == criteria_type, Badge.criteria_value <= value)
        .all()
    )

    for badge in candidates:
        if badge.id not in already_earned_ids:
            db.add(UserBadge(user_id=user.id, badge_id=badge.id))
            earned.append(badge)

    if earned:
        db.commit()

    return earned
