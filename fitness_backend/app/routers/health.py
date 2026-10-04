from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.health import HealthLogCreate, HealthLogResponse
from app.services.health_service import create_or_update_health_log, get_health_logs

router = APIRouter()


@router.post("/", response_model=HealthLogResponse, status_code=201)
def log_health(
    data: HealthLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_or_update_health_log(db, current_user, data)


@router.get("/", response_model=list[HealthLogResponse])
def list_health_logs(
    start: Optional[date] = Query(None),
    end: Optional[date] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_health_logs(db, current_user, start, end)
