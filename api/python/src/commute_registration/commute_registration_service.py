
from typing import Any, Dict, List
from commute_registration import commute_registration_model
from commute_registration.commute_registration_model import CommuteRegistration
from commute_registration.commute_registration_repo import CommuteRegistrationRepo


class CommuteRegistrationService():
    def __init__(self, commute_registration_repo: CommuteRegistrationRepo) -> None:
        self.commute_registration_repo = commute_registration_repo

    def get_all_commute_registrations(self) -> List[Dict[str, Any]]:
        return self.commute_registration_repo.find_all_commute_registrations()

    def get_commute_registration(self, commute_registration_id: int) -> List[Dict[str, Any]]:
        return self.commute_registration_repo.find_commute_registration(commute_registration_id)

    def get_commute_registrations_by_car_id(self, car_id: int) -> List[Dict[str, Any]]:
        return self.commute_registration_repo.find_all_commute_registrations_by_car_id(car_id)

    def add_commute_registration(self, commute_registration: CommuteRegistration) -> int:
        return self.commute_registration_repo.save_commute_registration(commute_registration)

    def update_commute_registration(self, commute_registration_id: int, commute_registration: CommuteRegistration) -> int:
        return self.commute_registration_repo.update_commute_registration(commute_registration_id, commute_registration)

    def delete_commute_registration(self, commute_registration_id: int) -> int:
        return self.commute_registration_repo.remove_commute_registration(commute_registration_id)
