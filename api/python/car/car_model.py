import dataclasses
import datetime

@dataclasses.dataclass
class Car:
    id: str
    brand: str
    model: str
    licensePlateNumber: str
    startDate: datetime
    endDate: datetime
    buildYear: str
