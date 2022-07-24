
"""
Main python file which runs the Api
"""
from fastapi import FastAPI
import uvicorn
import os.path
import json

from car.car_repo import CarRepository
from car.car_service import CarService
from car.car_controller import CarController
from commute_registration.commute_registration_controller import CommuteRegistrationController
from commute_registration.commute_registration_repo import CommuteRegistrationRepo
from commute_registration.commute_registration_service import CommuteRegistrationService

def start_api() -> FastAPI:
    app = FastAPI()

    # Initialize Car related classes
    car_repository = CarRepository()
    car_service = CarService(car_repository)
    car_controller = CarController(car_service)
    app.include_router(car_controller.router,tags=["Cars"])

    # Initialize registration related classes
    commute_registration_repository = CommuteRegistrationRepo()
    commute_registration_serivce = CommuteRegistrationService(commute_registration_repository)
    commute_registration_controller = CommuteRegistrationController(commute_registration_serivce)
    app.include_router(commute_registration_controller.router,tags=["Commute Registration"])

    return app

if __name__ == "__main__":
    if os.path.exists("config.json"):
        with open("config.json", "r", encoding='utf-8') as config:
            configData = json.load(config)
            host = configData['host']
            port = configData['port']
    else:
        host = 'localhost'
        port = 8080

    uvicorn.run(app=start_api(), host=host, port=port, reload=False, debug=False)
