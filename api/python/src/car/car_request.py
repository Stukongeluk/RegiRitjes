from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class CarRequest(BaseModel):
    brand: str
    model: str
    licensePlateNumber: str
    ownedDate: datetime
    endDate: Optional[datetime] = datetime(9999,1,1)
    buildYear: str