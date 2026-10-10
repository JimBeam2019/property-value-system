from dataclasses import dataclass


@dataclass(frozen=True)
class EstimatePropertyCommand:
    """
    ## Estimate Property 
    """
    square_footage: float
    bedrooms: int
    bathrooms: float
    year_built: int
    lot_size: float
    distance_to_city_center: float
    school_rating: float


@dataclass(frozen=True)
class EstimateResult:
    """
    ## Property Value Estimate Result
    """
    property: EstimatePropertyCommand
    predicted_price: float
