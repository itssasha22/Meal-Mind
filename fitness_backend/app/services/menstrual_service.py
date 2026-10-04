from datetime import date, timedelta
from typing import Optional

from sqlalchemy.orm import Session

from app.models.menstrual_log import MenstrualLog
from app.models.user import User
from app.schemas.menstrual import CycleSummary, MenstrualLogCreate


def create_or_update_menstrual_log(
    db: Session, user: User, data: MenstrualLogCreate
) -> MenstrualLog:
    existing = (
        db.query(MenstrualLog)
        .filter(MenstrualLog.user_id == user.id, MenstrualLog.date == data.date)
        .first()
    )
    if existing:
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)
        log = existing
    else:
        log = MenstrualLog(user_id=user.id, **data.model_dump())
        db.add(log)

    db.commit()
    db.refresh(log)
    return log


def get_menstrual_logs(
    db: Session, user: User, start: Optional[date], end: Optional[date]
) -> list[MenstrualLog]:
    query = db.query(MenstrualLog).filter(MenstrualLog.user_id == user.id)
    if start:
        query = query.filter(MenstrualLog.date >= start)
    if end:
        query = query.filter(MenstrualLog.date <= end)
    return query.order_by(MenstrualLog.date.asc()).all()


def get_cycle_summary(db: Session, user: User) -> CycleSummary:
    """
    Estimate cycle length and predict next period from historical period-start dates.
    A 'period start' is the first day of flow after a gap of ≥2 days without flow.
    """
    logs = (
        db.query(MenstrualLog)
        .filter(
            MenstrualLog.user_id == user.id,
            MenstrualLog.flow.in_(["spotting", "light", "medium", "heavy"]),
        )
        .order_by(MenstrualLog.date.asc())
        .all()
    )

    if not logs:
        return CycleSummary(
            cycle_start=None,
            cycle_length_days=None,
            period_length_days=None,
            predicted_next_period=None,
        )

    # Group consecutive days into periods
    periods: list[list[date]] = []
    current_period: list[date] = [logs[0].date]

    for log in logs[1:]:
        prev = current_period[-1]
        if (log.date - prev).days <= 2:
            current_period.append(log.date)
        else:
            periods.append(current_period)
            current_period = [log.date]
    periods.append(current_period)

    if len(periods) < 2:
        period_length = len(periods[0]) if periods else None
        return CycleSummary(
            cycle_start=periods[0][0] if periods else None,
            cycle_length_days=None,
            period_length_days=period_length,
            predicted_next_period=None,
        )

    cycle_lengths = [
        (periods[i + 1][0] - periods[i][0]).days for i in range(len(periods) - 1)
    ]
    avg_cycle = round(sum(cycle_lengths) / len(cycle_lengths))
    avg_period = round(sum(len(p) for p in periods) / len(periods))
    last_start = periods[-1][0]
    predicted_next = last_start + timedelta(days=avg_cycle)

    return CycleSummary(
        cycle_start=last_start,
        cycle_length_days=avg_cycle,
        period_length_days=avg_period,
        predicted_next_period=predicted_next,
    )
