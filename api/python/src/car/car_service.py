from typing import Any, Dict, List
from car.car_repo import CarRepository
from car import car_model

class CarService():
    def __init__(self, car_repo: CarRepository) -> None:  
        self.car_repo = car_repo

    def get_all_cars(self) -> List[Dict[str, Any]]:
        return self.car_repo.find_all_car_information()

    def get_car_information(self, id: int) -> List[Dict[str, Any]]:
        return self.car_repo.find_car_information(id)

    def add_car_information(self, car: car_model.Car) -> int:
        return self.car_repo.save_car_information(car)

    def update_car_information(self, car_id: int, car: car_model.Car) -> int:
        return self.car_repo.update_car_information(car_id, car)

    def delete_car_information(self, car_id: int) -> int:
        return self.car_repo.remove_car_information(car_id)
