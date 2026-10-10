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
COPY apps/property-value-estimator/pyproject.toml apps/property-value-estimator/pyproject.toml

COPY apps/property-value-estimator/README.md apps/property-value-estimator/README.md

# Copy application source
COPY apps/property-value-estimator/src apps/property-value-estimator/src

# Install dependencies
RUN uv sync \
    --package property-value-estimator \
    --frozen \
    --no-dev

FROM python:3.14-slim

# Prevent Python from creating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Make Python output appear immediately
ENV PYTHONUNBUFFERED=1

# Activate the uv-created environment
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Only the built venv crosses the stage boundary — no uv binary, no build cache
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/apps/property-value-estimator/src /app/apps/property-value-estimator/src

EXPOSE 8010

CMD ["uvicorn", "property_value_estimator.main:app", "--host", "0.0.0.0", "--port", "8010"]