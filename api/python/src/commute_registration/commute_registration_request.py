from datetime import datetime
from enum import Enum
from pydantic import BaseModel

from commute_registration.commute_registration_model import TravelType

class CommuteRegistrationRequest(BaseModel):
    carId: int
    commuteDate: datetime
    startAddress: str
    destinationAddress: str
    startMileage: int
    distanceInKm: int
    routeNotes: str
    type: TravelType
