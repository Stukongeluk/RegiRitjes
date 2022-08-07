from datetime import datetime
from typing import Optional
from pydantic import BaseModel
import pytz
class CarRequest(BaseModel):
    brand: str
    model: str
    licensePlateNumber: str
    ownedDate: datetime
    endDate: Optional[datetime] = datetime(2100,1,1, tzinfo=pytz.timezone('Europe/Amsterdam'))
    buildYear: str
