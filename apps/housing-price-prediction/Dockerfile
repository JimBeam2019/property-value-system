FROM python:3.14-slim AS builder

# uv configuration
ENV UV_COMPILE_BYTECODE=0
ENV UV_LINK_MODE=copy

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy workspace metadata
COPY pyproject.toml uv.lock ./

# Copy ML API project definition
COPY apps/housing-price-prediction/pyproject.toml apps/housing-price-prediction/pyproject.toml

COPY apps/housing-price-prediction/README.md apps/housing-price-prediction/README.md

# Copy application source
COPY apps/housing-price-prediction/src apps/housing-price-prediction/src

# Install dependencies
RUN uv sync \
    --package housing-price-prediction \
    --frozen \
    --no-dev

# ---- runtime stage ----
FROM python:3.14-slim

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Prevent Python from creating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Make Python output appear immediately
ENV PYTHONUNBUFFERED=1

# Activate the uv-created environment
ENV PATH="/app/.venv/bin:$PATH"

# Model location inside the container
ENV MODEL_DIR=/app/models

WORKDIR /app

# Only the built venv crosses the stage boundary — no uv binary, no build cache
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/apps/housing-price-prediction/src /app/apps/housing-price-prediction/src

# Copy trained model
COPY models models

EXPOSE 8000

CMD ["uvicorn", "housing_price_prediction.main:app", "--host", "0.0.0.0", "--port", "8000"]