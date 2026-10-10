from typing import Dict
from fastapi import APIRouter, status

router = APIRouter(prefix="/health", tags=["System Health"])


@router.get("", status_code=status.HTTP_200_OK)
async def health_check() -> Dict[str, str]:
    """
    ### GET health check API
    - Returns 200 OK to indicate the application server is up and running.
    """
    return {"status": "ok", "service": "housing-price-service"}
