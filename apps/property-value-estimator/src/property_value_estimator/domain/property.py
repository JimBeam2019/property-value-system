from pydantic.dataclasses import dataclass

from .error import DomainValidationError


@dataclass(frozen=True)
class Property:
    """
    ## Property Field Validations
    """
    square_footage: float
    bedrooms: int
    bathrooms: float
    year_built: int
    lot_size: float
    distance_to_city_center: float
    school_rating: float

    def __post_init__(self):
        """
        ### Validates fields after initialization
        """
        if self.square_footage <= 0:
            raise DomainValidationError("square_footage must be greater than 0")

        if self.bedrooms <= 0:
            raise DomainValidationError("bedrooms must be greater than 0")

        if self.bathrooms <= 0:
            raise DomainValidationError("bathrooms must be greater than 0")

        if self.year_built <= 0:
            raise DomainValidationError("year_built must be greater than 0")

        if self.lot_size <= 0:
            raise DomainValidationError("lot_size must be greater than 0")

        if self.distance_to_city_center < 0:
            raise DomainValidationError("distance_to_city_center cannot be negative")

        if not 0 <= self.school_rating <= 10:
            raise DomainValidationError("school_rating must be between 0 and 10")
