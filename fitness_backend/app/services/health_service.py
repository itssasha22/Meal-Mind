from datetime import date

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.health_log import HealthLog
from app.models.user import User
from app.schemas.health import HealthLogCreate
from app.services.badge_service import award_badge_if_earned
from app.services.streak_service import update_streak


def create_or_update_health_log(
    db: Session, user: User, data: HealthLogCreate
) -> HealthLog:
    existing = (
        db.query(HealthLog)
        .filter(HealthLog.user_id == user.id, HealthLog.date == data.date)
        .first()
    )
    if existing:
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)
        log = existing
    else:
        log = HealthLog(user_id=user.id, **data.model_dump())
        db.add(log)

    db.commit()
    db.refresh(log)

    update_streak(db, user, data.date)

    # Award step badges if steps logged
    if log.steps:
        award_badge_if_earned(db, user, "steps", log.steps)

    return log


def get_health_logs(
    db: Session, user: User, start: date | None, end: date | None
) -> list[HealthLog]:
    query = db.query(HealthLog).filter(HealthLog.user_id == user.id)
    if start:
        query = query.filter(HealthLog.date >= start)
    if end:
        query = query.filter(HealthLog.date <= end)
    return query.order_by(HealthLog.date.desc()).all()
