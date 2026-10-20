from dataclasses import dataclass
from pydantic import BaseModel, Field


@dataclass(frozen=True)
class EstimatePropertyInfo:
    """
    ## Estimate Property Info
    """
    square_footage: float
    bedrooms: int
    bathrooms: float
    year_built: int
    lot_size: float
    distance_to_city_center: float
    school_rating: float

@dataclass(frozen=True)
class EstimateResponse:
    """
    ## Property Value Estimate Response
    """
    property: EstimatePropertyInfo
    predicted_price: float

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
