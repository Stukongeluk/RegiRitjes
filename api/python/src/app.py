
"""
Main python file which runs the Api
"""
from fastapi import FastAPI
import uvicorn
from car.car_controller import CarController
from car.car_repo import CarRepository
from car.car_service import CarService

def start_api() -> FastAPI:
    app = FastAPI()
    
    # Initialize Car related classes
    car_repository = CarRepository()
    car_service = CarService(car_repository)
    car_controller = CarController(car_service)
    app.include_router(car_controller.router,tags=["Cars"])
    
    # Initialize registration related classes
    
    return app

if __name__ == "__main__":
    uvicorn.run(app=start_api(), host="0.0.0.0", port=8080, reload=False, debug=False)
