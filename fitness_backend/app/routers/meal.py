from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies import get_current_user
from app.models.food import Food
from app.models.meal_log import MealLog
from app.models.user import User
from app.schemas.food import FoodCreate, FoodResponse
from app.schemas.meal import DailySummary, MealLogCreate, MealLogResponse
from app.services.badge_service import award_badge_if_earned
from app.services.streak_service import update_streak

router = APIRouter()


# ── Food endpoints ──────────────────────────────────────────────────────────

@router.get("/foods/search", response_model=list[FoodResponse])
def search_foods(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return db.query(Food).filter(Food.name.ilike(f"%{q}%")).limit(20).all()


@router.post("/foods", response_model=FoodResponse, status_code=201)
def create_food(
    data: FoodCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    food = Food(**data.model_dump(), created_by_user_id=current_user.id)
    db.add(food)
    db.commit()
    db.refresh(food)
    return food


# ── Meal log endpoints ───────────────────────────────────────────────────────

@router.post("/log", response_model=MealLogResponse, status_code=201)
def log_meal(
    data: MealLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    food = db.query(Food).filter(Food.id == data.food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")

    ratio = data.quantity_g / 100
    log = MealLog(
        user_id=current_user.id,
        food_id=food.id,
        date=data.date,
        meal_type=data.meal_type,
        quantity_g=data.quantity_g,
        calories=round(food.calories_per_100g * ratio, 2),
        protein=round(food.protein_per_100g * ratio, 2),
        carbs=round(food.carbs_per_100g * ratio, 2),
        fat=round(food.fat_per_100g * ratio, 2),
        notes=data.notes,
    )
    db.add(log)
    db.commit()
    db.refresh(log)

    # Update streak and check badges
    update_streak(db, current_user, data.date)
    meal_count = db.query(MealLog).filter(MealLog.user_id == current_user.id).count()
    award_badge_if_earned(db, current_user, "meal_logs", meal_count)
    award_badge_if_earned(db, current_user, "streak", current_user.streak_count)

    return log


@router.get("/daily", response_model=DailySummary)
def get_daily_summary(
    log_date: date = Query(default_factory=date.today),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    logs = (
        db.query(MealLog)
        .filter(MealLog.user_id == current_user.id, MealLog.date == log_date)
        .all()
    )
    return DailySummary(
        date=log_date,
        total_calories=sum(l.calories for l in logs),
        total_protein=sum(l.protein for l in logs),
        total_carbs=sum(l.carbs for l in logs),
        total_fat=sum(l.fat for l in logs),
        goal_calories=current_user.daily_calorie_goal,
        logs=logs,
    )


@router.delete("/log/{log_id}", status_code=204)
def delete_meal_log(
    log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    log = db.query(MealLog).filter(
        MealLog.id == log_id, MealLog.user_id == current_user.id
    ).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log entry not found")
    db.delete(log)
    db.commit()
