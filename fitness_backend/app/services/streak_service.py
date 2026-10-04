from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.user import User


def update_streak(db: Session, user: User, log_date: date) -> None:
    """Update the user's streak based on the date of their latest log."""
    today = date.today()

    if user.last_log_date is None:
        user.streak_count = 1
        user.last_log_date = log_date
    elif log_date == user.last_log_date:
        # Already logged today — no change
        return
    elif log_date == user.last_log_date + timedelta(days=1):
        user.streak_count += 1
        user.last_log_date = log_date
    else:
        # Gap in logging — reset streak
        user.streak_count = 1
        user.last_log_date = log_date

    db.commit()
