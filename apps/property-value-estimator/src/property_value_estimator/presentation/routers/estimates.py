from fastapi import APIRouter, Depends, HTTPException, status

from ...application.house.dto import PropertyEstimateRequest, EstimateResponse
from ...application.house.use_cases import EstimatePropertyUseCase
from ...application.house.interfaces import ModelPredictionError
from ...domain.error import DomainValidationError
from ..dependencies import get_estimate_property_use_case

router = APIRouter(prefix="/estimates", tags=["Property Estimates"])

@router.post(
    "", response_model=EstimateResponse, status_code=status.HTTP_200_OK
)
async def estimate_property(
    request: PropertyEstimateRequest,
    use_case: EstimatePropertyUseCase = Depends(get_estimate_property_use_case),
):
    """
    ### POST preperty value prediction API
    @ Requests the info of property in JSON format.
    - Returns the property value estimation.
    """
    try:
        result = await use_case.execute(request)

        return result

    except DomainValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)
        ) from exc

    except ModelPredictionError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
