
from typing import Any, Dict, List
from datetime import date, datetime
from commute_registration import commute_registration_model
from commute_registration.commute_registration_model import CommuteRegistration
from commute_registration.commute_registration_repo import CommuteRegistrationRepo
import csv
import io
class CommuteRegistrationService():
    def __init__(self, commute_registration_repo: CommuteRegistrationRepo) -> None:
        self.commute_registration_repo = commute_registration_repo

    def get_all_commute_registrations(self) -> List[Dict[str, Any]]:
        commutes = self.commute_registration_repo.find_all_commute_registrations()
        for commute in commutes:
            commute.update((k, str(v)) for k, v in commute.items() if k == "id")
        return commutes
    
    def get_commute_registration_csv(self, car_id: int, before_incl_date: datetime, after_excl_date: datetime) -> List[Dict[str, any]]:
        commutes = self.commute_registration_repo.find_all_commute_registrations_by_car_id(car_id)
        filtered_commutes = list(filter(lambda commute: (commute['commuteDate'] <= before_incl_date and commute['commuteDate'] > after_excl_date), commutes))
        buffer = io.BytesIO()
        csv_headers = ['id', 'carId', 'commuteDate', 'startAddress', 'destinationAddress', 'startMileage', 'endMileage', 'distanceInKm', 'routeNotes', 'type']
        writer = csv.DictWriter(buffer, csv_headers)
        for filtered_commute in filtered_commutes:
            writer.writerow(filtered_commute)
        return buffer.getvalue()

    def get_commute_registration(self, commute_registration_id: int) -> List[Dict[str, Any]]:
        return self.commute_registration_repo.find_commute_registration(commute_registration_id)

    def get_commute_registrations_by_car_id(self, car_id: int) -> List[Dict[str, Any]]:
        commutes = self.commute_registration_repo.find_all_commute_registrations_by_car_id(car_id)
        for commute in commutes:
            commute.update((k, str(v)) for k, v in commute.items() if k == "id")
        return commutes 

    def add_commute_registration(self, commute_registration: CommuteRegistration) -> int:
        return self.commute_registration_repo.save_commute_registration(commute_registration)

    def update_commute_registration(self, commute_registration_id: int, commute_registration: CommuteRegistration) -> int:
        return self.commute_registration_repo.update_commute_registration(commute_registration_id, commute_registration)

    def delete_commute_registration(self, commute_registration_id: int) -> int:
        return self.commute_registration_repo.remove_commute_registration(commute_registration_id)
