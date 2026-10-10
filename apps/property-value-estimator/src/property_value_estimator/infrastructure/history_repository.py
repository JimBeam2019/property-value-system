# from dataclasses import dataclass
# from datetime import datetime, timezone
# from uuid import uuid7

# from ..domain.property import Property


# @dataclass(frozen=True)
# class Estimate:
#     id: str
#     property: Property
#     estimated_price: float
#     created_at: datetime


# class InMemoryEstimateHistoryRepository:
#     def __init__(self) -> None:
#         self._estimates: list[Estimate] = []

#     async def save(self, property: Property, estimated_price: float) -> Estimate:
#         estimate = Estimate(
#             id=str(uuid7),
#             property=property,
#             estimated_price=estimated_price,
#             created_at=datetime.now(timezone.utc),
#         )

#         self._estimates.insert(0, estimate)

#         return estimate

#     async def get_all(self) -> list[Estimate]:
#         return list(self._estimates)
