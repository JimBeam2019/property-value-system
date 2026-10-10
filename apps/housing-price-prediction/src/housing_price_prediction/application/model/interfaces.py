from abc import ABC, abstractmethod
from typing import Optional

from ...domain.model_metrics import ModelMetrics
from ...domain.house import House


class ModelResponsitoryInterface(ABC):
    """
    ## Model Responsitory Interface
    """
    @abstractmethod
    async def get_model_metrics(self) -> Optional[ModelMetrics]:
        pass

    @abstractmethod
    async def predict_house_price(self, houses: list[House]) -> list[House]:
        pass


class UnitOfWorkInterface(ABC):
    """
    ## Unit Of Work Interface
    """
    model: ModelResponsitoryInterface

    async def __aenter__(self) -> "UnitOfWorkInterface":
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        pass
