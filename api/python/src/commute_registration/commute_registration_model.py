from datetime import datetime
from enum import Enum
from pydantic import BaseModel

class TravelType(Enum):
    """The travel types of the commute.
    Could be one of the following: 'private' or 'business'
    """
    PRIVATE = 'private'
    BUSINESS = 'business'

class CommuteRegistration(BaseModel):
    id: int
    carId: int
    commuteDate: datetime
    startAddress: str
    destinationAddress: str
    startMileage: int
    endMileage: int
    distanceInKm: int
    routeNotes: str
    type: TravelType
