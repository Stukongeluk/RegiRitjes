from datetime import datetime
import unittest
from unittest.mock import MagicMock
from src.car import car_model
from src.car.car_repo import CarRepository

from src.car.car_service import CarService

# TODO: Figure out the imports issues..
class CarServiceTest(unittest.TestCase):

    def setUp(self) -> None:
        self.car_db = CarRepository()
        self.car_service = CarService(self.car_db)
        
    def whenGetAllCars_withSingleItemInDb_shouldReturnListOfSingleCar(self):
        self.car_db.find_all_car_information = MagicMock(return_value=[
            car_model.Car(id=1, brand='Peugeot', model="208", licensePlateNumber="RandomLicense", ownedDate=datetime.now(), buildYear=2016)
        ])
        result = self.car_service.get_all_cars()
        assert len(result) == 1
