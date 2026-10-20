from .dto import PropertyEstimateRequest, EstimatePropertyInfo, EstimateResponse
from .interfaces import ModelClient
from ...domain.property import Property


class EstimatePropertyUseCase:
    """
    ## Estimate Property Use Case
    """
    def __init__(self, model_client: ModelClient) -> None:
        self._model_client = model_client

    async def execute(self, command: PropertyEstimateRequest) -> EstimateResponse:
        """
        ### Executes Preperty Value Estimation
        """
        # Proceeds Domain validations
        Property(
            square_footage=command.square_footage,
            bedrooms=command.bedrooms,
            bathrooms=command.bathrooms,
            year_built=command.year_built,
            lot_size=command.lot_size,
            distance_to_city_center=command.distance_to_city_center,
            school_rating=command.school_rating,
        )

        predicted_price = await self._model_client.predict(command)

        return EstimateResponse(
            property=EstimatePropertyInfo(
                square_footage=command.square_footage,
                bedrooms=command.bedrooms,
                bathrooms=command.bathrooms,
                year_built=command.year_built,
                lot_size=command.lot_size,
                distance_to_city_center=command.distance_to_city_center,
                school_rating=command.school_rating
            ),
            predicted_price=predicted_price,
        )
