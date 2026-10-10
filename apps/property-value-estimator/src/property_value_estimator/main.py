from contextlib import asynccontextmanager

import aiohttp
from fastapi import FastAPI

from .presentation.routers.estimates import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    session = aiohttp.ClientSession()
    app.state.http_session = session

    try:
        yield
    finally:
        await session.close()


app = FastAPI(title="Property Value Estimator API", version="1.0.0", lifespan=lifespan)

app.include_router(router)
