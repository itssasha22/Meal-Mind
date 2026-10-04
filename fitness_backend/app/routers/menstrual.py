from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.menstrual import CycleSummary, MenstrualLogCreate, MenstrualLogResponse
from app.services.menstrual_service import (
    create_or_update_menstrual_log,
    get_cycle_summary,
    get_menstrual_logs,
)

router = APIRouter()


@router.post("/", response_model=MenstrualLogResponse, status_code=201)
def log_menstrual(
    data: MenstrualLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_or_update_menstrual_log(db, current_user, data)


@router.get("/", response_model=list[MenstrualLogResponse])
def list_logs(
    start: Optional[date] = Query(None),
    end: Optional[date] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_menstrual_logs(db, current_user, start, end)


@router.get("/cycle-summary", response_model=CycleSummary)
def cycle_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_cycle_summary(db, current_user)
