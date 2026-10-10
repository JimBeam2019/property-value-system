from fastapi import Depends

from ..infrastructure.model_respositories import InMemoryUnitOfWork

from ..application.model.use_case import (
    GetModelMetricsUseCase,
    PredictHousePriceUseCase,
)


def get_uow() -> InMemoryUnitOfWork:
    """
    ### Get Unit Of Work for Model Dependency
    """
    return InMemoryUnitOfWork()


def get_get_model_metrics_use_case(
    uow: InMemoryUnitOfWork = Depends(get_uow),
) -> GetModelMetricsUseCase:
    """
    ### Get Model Metric Use Case for Model Dependency
    """
    return GetModelMetricsUseCase(uow)


def get_predict_house_price_use_case(
    uow: InMemoryUnitOfWork = Depends(get_uow),
) -> PredictHousePriceUseCase:
    """
    ### Get Property Prediction Use Case for Model Dependency
    """
    return PredictHousePriceUseCase(uow)
