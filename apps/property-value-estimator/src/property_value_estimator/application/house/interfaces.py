from abc import ABC, abstractmethod

from .dto import PropertyEstimateRequest


class ModelPredictionError(Exception):
    pass


class ModelClient(ABC):
    """
    ## Model Client Interface
    """
    @abstractmethod
    async def predict(self, property: PropertyEstimateRequest) -> float:
        raise NotImplementedError
