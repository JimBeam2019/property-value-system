from abc import ABC, abstractmethod

from .dto import EstimatePropertyCommand


class ModelPredictionError(Exception):
    pass


class ModelClient(ABC):
    """
    ## Model Client Interface
    """
    @abstractmethod
    async def predict(self, property: EstimatePropertyCommand) -> float:
        raise NotImplementedError
