from fastapi import APIRouter
from car.car_request import CarRequest
from car.car_service import CarService
from car.car_id_response import CarIdResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

class CarController():
    def __init__(self, car_service: CarService) -> None:
        self.car_service = car_service
    
        self.router = APIRouter(
            prefix="/cars",
            tags=["Cars"]
        )

        @self.router.get("/")
        async def get_all_cars() -> JSONResponse:
            """Find all cars

            Returns:
                JSONResponse: A list of cars in Json format
            """
            return JSONResponse(content=self.car_service.get_all_cars())

        @self.router.get("/{car_id}")
        async def get_car_information(car_id: int) -> JSONResponse:
            """Get single car information

            Args:
                car_id (int): The ID of the car

            Returns:
                JSONResponse: A list of the car matching the ID in Json format
            """
            return JSONResponse(content=self.car_service.get_car_information(car_id))

        @self.router.post("/")
        async def add_car_information(car: CarRequest) -> JSONResponse:
            """Add single car information

            Args:
                car (car_request.CarRequest): A car object with the required fields

            Returns:
                JSONResponse: The Id of the added car.
            """
            car_json =  jsonable_encoder(car)
            return JSONResponse(content=CarIdResponse(
                id=self.car_service.add_car_information(car_json)))

        @self.router.put("/{car_id}")
        async def update_car_information(car_id: int, car: CarRequest) -> JSONResponse:
            """Update single car information

            Args:
                car_id (int): The ID of the car you want to update/change
                car (car_request.CarRequest): A car object with the required fields

            Returns:
                JSONResponse: The Id of the changed car.
            """
            car_json =  jsonable_encoder(car)
            return JSONResponse(content=CarIdResponse(
                id=self.car_service.update_car_information(car_id, car_json))
            )

        @self.router.delete("/{car_id}")
        async def delete_car_information(car_id: int) -> JSONResponse:
            """Delete single car

            Args:
                car_id (int): The ID of the car you want to delete.

            Returns:
                JSONResponse: The Id of the deleted car.
            """
            return JSONResponse(content=CarIdResponse(
                id=self.car_service.delete_car_information(car_id)))
  