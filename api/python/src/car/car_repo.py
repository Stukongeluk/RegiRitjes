from typing import Any, Dict, List, Type
from car import car_model
from pysondb import db

class CarRepository():
    car_db: db.JsonDatabase
    def __init__(self) -> None:
        self.car_db = db.getDb("car_data.json")

    def find_all_car_information(self) -> List[Dict[str, Any]]:
        return self.car_db.getAll()

    def find_car_information(self, id: int) -> List[Dict[str, Any]]:
        return self.car_db.getById(id)
            
    def save_car_information(self, car: car_model.Car) -> int:
        return self.car_db.add(car)

    def update_car_information(self, car_id: int, car: car_model.Car) -> int:
        old_car = self.car_db.getById(car_id)
        self.car_db.update(old_car, car)
        return car_id

    def remove_car_information(self, car_id: int) -> int:
        self.car_db.deleteById(car_id)
        return car_id
