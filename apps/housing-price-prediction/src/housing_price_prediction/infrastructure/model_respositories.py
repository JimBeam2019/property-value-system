import asyncio
import os
import pickle
import pandas as pd
import json

from pathlib import Path
from typing import Any
from datetime import datetime

from ..domain.house import House
from ..domain.model_metrics import ModelMetrics
from ..application.model.interfaces import (
    ModelResponsitoryInterface,
    UnitOfWorkInterface,
)

# Initialze Global Pathes
MODEL_DIR = Path(os.getenv("MODEL_DIR", "../../models"))

MODEL_PATH = MODEL_DIR / "ridge_house_price_model.pkl" 
METADATA_PATH = MODEL_DIR / "ridge_house_price_model_info.json"

# Initialze Global Variables
_REGRESSION_MODEL: Any | None = None
_MODEL_METRICS: ModelMetrics | None = None
_MODEL_LOCK = asyncio.Lock()


def preload_model_metrics() -> None:
    """
    ### Pre-loads Model Metrics from Ridge Model Info
    """
    if not METADATA_PATH.exists():
        print(f"Warning: Metadata file not found at {METADATA_PATH}.")
        return

    try:
        # metadata_path = Path(file_path)
        global _MODEL_METRICS

        with open(METADATA_PATH, "r") as f:
            metadata_json = json.load(f)
            _MODEL_METRICS = ModelMetrics(**metadata_json)
    except Exception as e:
        print(f"Error load json file: {str(e)}")


def preload_regression_model() -> None:
    """
    ### Pre-loads Ridge Regression Model
    """
    if not MODEL_PATH.exists():
        print(f"Warning: model file not found at {MODEL_PATH}.")
        return

    try:
        global _REGRESSION_MODEL

        with open(MODEL_PATH, "rb") as f:
            _REGRESSION_MODEL = pickle.load(f)
    except Exception as e:
        print(f"Error load pkl file: {str(e)}")

# Pre-load Model & Metrics Info
preload_regression_model()
preload_model_metrics()


def create_features(data: pd.DataFrame) -> pd.DataFrame:
    """
    ### Creates the model features from raw housing data.
    """
    data = data.copy()

    data["property_age"] = datetime.now().year - data["year_built"]

    features = [
        "square_footage",
        "bedrooms",
        "bathrooms",
        "property_age",
        "lot_size",
        "distance_to_city_center",
        "school_rating",
    ]

    return data[features]


class InMemoryModelRepository(ModelResponsitoryInterface):
    """
    ## In-Memory Model Repository
    """
    def __init__(self) -> None:
        super().__init__()

    async def get_model_metrics(self) -> ModelMetrics | None:
        """
        ### Returns Model Metrics.
        """
        async with _MODEL_LOCK:
            return _MODEL_METRICS

    async def predict_house_price(self, houses: list[House]) -> list[House]:
        """
        ### Returns Predited Property Price(s).
        """
        async with _MODEL_LOCK:
            df_houses = pd.DataFrame([vars(house) for house in houses])
            properties = create_features(df_houses)

            pred_prices = _REGRESSION_MODEL.predict(properties)  # type: ignore

            result = df_houses.copy()
            result["price"] = pred_prices

            return list(
                map(
                    lambda x: House(
                        square_footage=x[0],
                        bedrooms=x[1],
                        bathrooms=x[2],
                        year_built=x[3],
                        lot_size=x[4],
                        distance_to_city_center=x[5],
                        school_rating=x[6],
                        price=x[7],
                    ),
                    result.values.tolist(),
                )
            )


class InMemoryUnitOfWork(UnitOfWorkInterface):
    """
    ## In-Memory Unit Of Work
    """
    async def __aenter__(self) -> "InMemoryUnitOfWork":
        self.model = InMemoryModelRepository()
        return await super().__aenter__()  # type: ignore

    async def __aexit__(self, exc_type, exc, tb) -> None:
        await super().__aexit__(exc_type, exc, tb)
