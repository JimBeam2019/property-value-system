from fastapi import FastAPI

from .presentation.routers.health import router as health_router
from .presentation.routers.model import router as model_router

app = FastAPI(title="Housing Price Prediction")

app.include_router(health_router)
app.include_router(model_router)
