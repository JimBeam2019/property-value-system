from typing import Optional
from pydantic import BaseModel, Field

from housing_price_prediction.domain.house import House
from housing_price_prediction.domain.model_metrics import ModelMetrics
from .interfaces import UnitOfWorkInterface


class CreateHouseInfoDTO(BaseModel):
    """
    ## Property Request Info
    """
    square_footage: int = Field(
        ..., gt=0, description="Square footage must be a positive number"
    )
    bedrooms: int = Field(
        ..., ge=0, description="Bedroom number must be greater than or equal to 0"
    )
    bathrooms: float = Field(
        ..., ge=0, description="Bedroom number must be greater than or equal to 0"
    )
    year_built: int = Field(
        ..., gt=0, description="Year built must be a positive number"
    )
    lot_size: int = Field(
        ..., gt=0, description="Square footage must be a positive number"
    )
    distance_to_city_center: float = Field(
        ..., gt=0, description="Square footage must be a positive number"
    )
    school_rating: float = Field(
        ..., ge=0, description="Bedroom number must be greater than or equal to 0"
    )


class GetModelMetricsUseCase:
    """
    ## Get Model Metrics Use Case
    """
    def __init__(self, uow: UnitOfWorkInterface) -> None:
        self.uow = uow

    async def execute(self) -> Optional[ModelMetrics]:
        async with self.uow:
            metrics = await self.uow.model.get_model_metrics()

            return metrics


class PredictHousePriceUseCase:
    """
    ## Predict House Price Use Case
    """
    def __init__(self, uow: UnitOfWorkInterface) -> None:
        self.uow = uow

    async def execute(self, dto_list: list[CreateHouseInfoDTO]) -> list[House] | House:
        async with self.uow:
            houses = [
                House(
                    square_footage=dto.square_footage,
                    bedrooms=dto.bedrooms,
                    bathrooms=dto.bathrooms,
                    year_built=dto.year_built,
                    lot_size=dto.lot_size,
                    distance_to_city_center=dto.distance_to_city_center,
                    school_rating=dto.school_rating,
                )
                for dto in dto_list
            ]

            res_houses = await self.uow.model.predict_house_price(houses)

            return res_houses if len(res_houses) > 1 else res_houses[0]
