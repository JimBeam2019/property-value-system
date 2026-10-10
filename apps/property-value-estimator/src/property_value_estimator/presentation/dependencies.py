import os

# import aiohttp
from fastapi import Request

from ..application.house.use_cases import EstimatePropertyUseCase
from ..infrastructure.ml_client import AioHttpModelClient

# Environment Variable
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8000")


# async def get_http_session() -> aiohttp.ClientSession:
#     return aiohttp.ClientSession()


async def get_estimate_property_use_case(request: Request) -> EstimatePropertyUseCase:
    """
    ### Get Model Metric Use Case for Model Dependency
    """
    # session = aiohttp.ClientSession()

    client = AioHttpModelClient(
        base_url=ML_SERVICE_URL, session=request.app.state.http_session
    )

    return EstimatePropertyUseCase(model_client=client)
