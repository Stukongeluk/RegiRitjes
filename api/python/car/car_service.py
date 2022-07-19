from car import car_repo

def get_car_information(id: int):
    return car_repo.find_car_information(id)