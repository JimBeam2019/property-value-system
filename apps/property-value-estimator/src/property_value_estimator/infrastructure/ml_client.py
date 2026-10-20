import aiohttp

from ..application.house.dto import PropertyEstimateRequest
from ..application.house.interfaces import ModelClient, ModelPredictionError


class AioHttpModelClient(ModelClient):
    """
    ## HTTP Model Client for House Price Prediction Service
    """
    def __init__(self, base_url: str, session: aiohttp.ClientSession) -> None:
        self._base_url = base_url.rstrip("/")
        self._session = session

    async def predict(self, property: PropertyEstimateRequest) -> float:
        """
        ### Calls the House Price Prediction API to make a simgle Property Value Estimation.
        """
        payload = {
            "square_footage": property.square_footage,
            "bedrooms": property.bedrooms,
            "bathrooms": property.bathrooms,
            "year_built": property.year_built,
            "lot_size": property.lot_size,
            "distance_to_city_center": property.distance_to_city_center,
            "school_rating": property.school_rating,
        }

        try:
            async with self._session.post(
                f"{self._base_url}/model/predict", json=payload
            ) as response:
                if response.status != 200:
                    body = await response.text()

                    raise ModelPredictionError(
                        f"ML service returned " f"{response.status}: {body}"
                    )

                data = await response.json()

                return float(data["price"])

        except aiohttp.ClientError as exc:
            raise ModelPredictionError("Unable to connect to ML service") from exc

        except (KeyError, TypeError, ValueError) as exc:
            raise ModelPredictionError("Invalid response from ML service") from exc
