from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.progress import ProgressLog
from app.models.user import User
from app.schemas.progress import ProgressCreate, ProgressResponse

router = APIRouter()


@router.post("/", response_model=ProgressResponse, status_code=201)
def log_progress(
    data: ProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = (
        db.query(ProgressLog)
        .filter(ProgressLog.user_id == current_user.id, ProgressLog.date == data.date)
        .first()
    )
    if existing:
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)
        log = existing
    else:
        log = ProgressLog(user_id=current_user.id, **data.model_dump())
        db.add(log)

    db.commit()
    db.refresh(log)
    return log


@router.get("/", response_model=list[ProgressResponse])
def get_progress(
    start: Optional[date] = Query(None),
    end: Optional[date] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(ProgressLog).filter(ProgressLog.user_id == current_user.id)
    if start:
        query = query.filter(ProgressLog.date >= start)
    if end:
        query = query.filter(ProgressLog.date <= end)
    return query.order_by(ProgressLog.date.desc()).all()


@router.delete("/{log_id}", status_code=204)
def delete_progress(
    log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    log = (
        db.query(ProgressLog)
        .filter(ProgressLog.id == log_id, ProgressLog.user_id == current_user.id)
        .first()
    )
    if not log:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(log)
    db.commit()
