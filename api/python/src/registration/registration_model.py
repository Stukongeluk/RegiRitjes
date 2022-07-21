from datetime import datetime
from enum import Enum
from pydantic import BaseModel

class TravelType(Enum):
    PRIVATE = 0
    BUSINESS = 1

class CommuteRegistration(BaseModel):
    id: int
    commuteDate: datetime
    startAddress: str
    destinationAddress: str
    startMileage: int
    distanceInKm: int
    routeNotes: str
    type: TravelType
