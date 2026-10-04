from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routers import auth, user, meal, progress, health, menstrual, badge

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fitness Tracker API",
    description="Backend API for the fitness and nutrition tracking app",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(user.router, prefix="/api/users", tags=["Users"])
app.include_router(meal.router, prefix="/api/meals", tags=["Meals"])
app.include_router(progress.router, prefix="/api/progress", tags=["Progress"])
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(menstrual.router, prefix="/api/menstrual", tags=["Menstrual"])
app.include_router(badge.router, prefix="/api/badges", tags=["Badges"])


@app.get("/")
def root():
    return {"message": "Fitness Tracker API is running"}
