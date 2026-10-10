from pydantic import ConfigDict
from pydantic.dataclasses import dataclass
from typing import Optional


@dataclass
class House:
    """
    ## Property Response
    """
    model_config = ConfigDict(from_attributes=True)

    square_footage: int
    bedrooms: int
    bathrooms: float
    year_built: int
    lot_size: int
    distance_to_city_center: float
    school_rating: float
    price: Optional[float] = None

    def __init__(
        self,
        square_footage: int,
        bedrooms: int,
        bathrooms: float,
        year_built: int,
        lot_size: int,
        distance_to_city_center: float,
        school_rating: float,
        price: Optional[float] = None,
    ) -> None:
        self.square_footage = square_footage
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.year_built = year_built
        self.lot_size = lot_size
        self.distance_to_city_center = distance_to_city_center
        self.school_rating = school_rating
        self.price = price
