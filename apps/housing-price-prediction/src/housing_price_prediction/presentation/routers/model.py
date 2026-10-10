from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status

from ...domain.house import House
from ...domain.model_metrics import ModelMetrics
from ...application.model.use_case import (
    GetModelMetricsUseCase,
    PredictHousePriceUseCase,
    CreateHouseInfoDTO,
)
from ...presentation.model_dependencies import (
    get_get_model_metrics_use_case,
    get_predict_house_price_use_case,
)

router = APIRouter(prefix="/model", tags=["Model"])


@router.get("/metrics", response_model=ModelMetrics, status_code=status.HTTP_200_OK)
async def view_metrics(
    use_case: GetModelMetricsUseCase = Depends(get_get_model_metrics_use_case),
):
    """
    ### GET metrics API
    - Returns model metrics.
    """
    try:
        metrics = await use_case.execute()

        if metrics is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Metrics not found"
            )

        return metrics
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post(
    "/predict", response_model=list[House] | House, status_code=status.HTTP_200_OK
)
async def predict_house_price(
    payload: Union[CreateHouseInfoDTO, list[CreateHouseInfoDTO]],
    use_case: PredictHousePriceUseCase = Depends(get_predict_house_price_use_case),
):
    """
    ### POST preperty value prediction(s) API
    @ Requests the info of property/properties in JSON format.
    - Returns the prediction of property/properties.
    """
    try:
        house_dto_list = (
            [payload] if isinstance(payload, CreateHouseInfoDTO) else payload
        )

        return await use_case.execute(house_dto_list)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
