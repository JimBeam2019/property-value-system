from pydantic.dataclasses import dataclass


@dataclass
class ModelMetrics:
    """
    ## Model Metrics
    """
    model: ModelInfo
    performance: ModelPerformance


@dataclass
class ModelInfo:
    """
    ## Model Info
    """
    type: str
    alpha: float
    features: list[str]
    intercept: float
    coefficients: dict[str, float]


@dataclass
class ModelPerformance:
    """
    ## Model Performance
    """
    test: dict[str, float]
    cross_validation: dict[str, float]
