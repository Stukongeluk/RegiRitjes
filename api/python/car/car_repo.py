import orjson
from car import car_model

def find_car_information(id: int):
    with open("car_data.json", "r") as car_data:
        data = orjson.loads(car_data.read())
        print(data)
        return data
        
def save_car_information(car: car_model.Car):
    with open("car_data.json", "w") as car_data:
        data = orjson.dumps(car)
        print(data)