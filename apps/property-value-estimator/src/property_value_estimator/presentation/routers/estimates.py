from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from ...application.house.dto import EstimatePropertyCommand
from ...application.house.use_cases import EstimatePropertyUseCase
from ...application.house.interfaces import ModelPredictionError
from ...domain.error import DomainValidationError
from ..dependencies import get_estimate_property_use_case

router = APIRouter(prefix="/estimates", tags=["Property Estimates"])


class PropertyEstimateRequest(BaseModel):
    """
    ## Property Estimate Request with Validation Checks
    """
    square_footage: float = Field(
        ..., gt=0, description="Square footage must be a positive number"
    )
    bedrooms: int = Field(
        ..., gt=0, description="Bedroom number must be greater than or equal to 0"
    )
    bathrooms: float = Field(
        ..., gt=0, description="Bathroom number must be greater than or equal to 0"
    )
    year_built: int = Field(..., gt=0, description="Year built must be greater than 0")
    lot_size: float = Field(..., gt=0, description="Lot size must be a positive number")
    distance_to_city_center: float = Field(
        ..., ge=0, description="Distance to city center must be a positive number"
    )
    school_rating: float = Field(
        ..., ge=0, le=10, description="School rating must be between 0 and 10"
    )


class PropertyEstimateResponse(BaseModel):
    """
    ## Property Estimate Response
    """
    property: PropertyEstimateRequest
    predicted_price: float


@router.post(
    "", response_model=PropertyEstimateResponse, status_code=status.HTTP_200_OK
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
    command = EstimatePropertyCommand(
        square_footage=request.square_footage,
        bedrooms=request.bedrooms,
        bathrooms=request.bathrooms,
        year_built=request.year_built,
        lot_size=request.lot_size,
        distance_to_city_center=request.distance_to_city_center,
        school_rating=request.school_rating,
    )

    try:
        result = await use_case.execute(command)

        return PropertyEstimateResponse(
            property=request, predicted_price=result.predicted_price
        )

    except DomainValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)
        ) from exc

    except ModelPredictionError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)
        ) from exc
