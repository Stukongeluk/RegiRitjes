from typing import Any, Dict, List
from pysondb import db

from commute_registration.commute_registration_model import CommuteRegistration

class CommuteRegistrationRepo():
    commute_registration_db: db.JsonDatabase
    def __init__(self) -> None:
        self.commute_registration_db = db.getDb("registration.json")

    def find_all_commute_registrations(self) -> List[Dict[str, Any]]:
        return self.commute_registration_db.getAll()
    
    def find_all_commute_registrations_by_car_id(self, car_id: int):
        return self.commute_registration_db.getByQuery(query={"carId": car_id})

    def find_commute_registration(self, registration_id: int) -> List[Dict[str, Any]]:
        return self.commute_registration_db.getById(registration_id)
            
    def save_commute_registration(self, commute_registration: CommuteRegistration) -> int:
        return self.commute_registration_db.add(commute_registration)

    def update_commute_registration(self, registration_id: int, commute_registration: CommuteRegistration) -> int:
        old_commute_registration = self.commute_registration_db.getById(registration_id)
        self.commute_registration_db.update(old_commute_registration, commute_registration)
        return registration_id

    def remove_commute_registration(self, registration_id: int) -> int:
        self.commute_registration_db.deleteById(registration_id)
        return registration_id
