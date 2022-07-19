from fastapi import APIRouter
from car import car_service

router = APIRouter(
    prefix="/cars",
    tags=["cars"]
    )

@router.get("/{item_id}")
async def get_car_information(item_id):
    return car_service.get_car_information(item_id)