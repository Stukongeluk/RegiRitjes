from typing import Optional
from fastapi import APIRouter
from commute_registration.commute_registration_service import CommuteRegistrationService
from commute_registration.commute_registration_request import CommuteRegistrationRequest
from rest.id_response import ItemIdResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, StreamingResponse
from datetime import datetime

class CommuteRegistrationController():
    def __init__(self, commute_registration_service: CommuteRegistrationService) -> None:
        self.commute_registration_service = commute_registration_service
        self.router = APIRouter(
            prefix="/commute_registration",
            tags=["Commute Registration"]
        )

        @self.router.get("/")
        async def get_all_commute_registrations(car_id: Optional[int] = None, export: Optional[bool] = False, before_date: Optional[str] = datetime.now().date, after_date: Optional[str] = '9999-12-12') -> JSONResponse:
            """Get commute registrations

            Args:
                car_id (Optional[int], optional): The car Id which you want the commute registrations of. Defaults to None.
                csv (Optional[bool], optional): A boolean to determine if it should return a csv export. Defaults to False.

            Returns:
                JSONResponse: A list of the commute registrations in json
            """
            if car_id and export:
                # TODO: Refactor this and test if it works.
                content = self.commute_registration_service.get_commute_registration_csv(car_id, before_date, after_date)
                return StreamingResponse(content)
            elif car_id:
                return JSONResponse(content=self.commute_registration_service.get_commute_registrations_by_car_id(car_id))
            return JSONResponse(content=self.commute_registration_service.get_all_commute_registrations())
            
        @self.router.get("/{commute_registration_id}")
        async def get_commute_registration(commute_registration_id: int) -> JSONResponse:
            """Get single commute registration

            Args:
                commute_registration_id (int): The ID of the commute registration

            Returns:
                JSONResponse: A list of the commute registrations matching the ID in Json format
            """
            return JSONResponse(content=self.commute_registration_service.get_commute_registration(commute_registration_id))

        @self.router.post("/", response_model=ItemIdResponse)
        async def add_commute_registration(commute_registration_request: CommuteRegistrationRequest) -> JSONResponse:
            """Add single commute registration

            Args:
                commute registration (CommuteRegistrationRequest): A commute registrations object with the required fields

            Returns:
                JSONResponse: The Id of the added commute registration.
            """
            commute_registration_json =  jsonable_encoder(commute_registration_request)
            response = jsonable_encoder(ItemIdResponse(
                id=self.commute_registration_service.add_commute_registration(commute_registration_json)))

            return JSONResponse(content=response, 
                                media_type="application/json")

        @self.router.put("/{commute_registration_id}", response_model=ItemIdResponse)
        async def update_commute_registration(commute_registration_id: int, commute_registration_request: CommuteRegistrationRequest) -> JSONResponse:
            """Update single commute registration

            Args:
                commute_registration_id (int): The ID of the commute registration you want to update/change
                commute_registration_request (CommuteRegistrationRequest): A commute registration object with the required fields

            Returns:
                JSONResponse: The Id of the changed commute registration.
            """
            commute_registration_json =  jsonable_encoder(commute_registration_request)
            response = jsonable_encoder(ItemIdResponse(
                id=self.commute_registration_service.update_commute_registration(commute_registration_id, commute_registration_json)))

            return JSONResponse(content=response, media_type="application/json")

        @self.router.delete("/{commute_registration_id}", response_model=ItemIdResponse)
        async def delete_commute_registration(commute_registration_id: int) -> JSONResponse:
            """Delete single commute registration

            Args:
                commute_registration_id (int): The ID of the commute registration you want to delete.

            Returns:
                JSONResponse: The Id of the deleted commute registration.
            """
            response = jsonable_encoder(ItemIdResponse(
                id=self.commute_registration_service.delete_commute_registration(commute_registration_id)))

            return JSONResponse(content=ItemIdResponse(
                id=response, media_type="application/json"))
