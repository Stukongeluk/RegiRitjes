
"""
Main python file which runs the Api
"""
import os.path
from fastapi import FastAPI
import uvicorn
from car import car_controller

app = FastAPI()
app.include_router(car_controller.router,tags=["cars"])

if __name__ == "__main__":
    if not os.path.exists("car_data.json"):
        with open("car_data.json", "w") as car_data:
            car_data.write("{}")
    if not os.path.exists("registration_data.json"):
        with open("registration_data.json", "w") as registration_data:
            registration_data.write("{}")
    uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=False, debug=False)
