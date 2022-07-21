from datetime import datetime
from pydantic import BaseModel

class Car(BaseModel):
    id: int
    brand: str
    model: str
    licensePlateNumber: str
    ownedDate: datetime
    endDate: datetime
    buildYear: str
