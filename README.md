# RegiRitjes
Self-hosted "Ritten registratie" app. Instead of spending your hard-earned cash to keep track of the amount of kilometres you've ridden, why not host and install it yourself for "free"?

Suitable for self-employed commuters/freelancers.

## Info
This repo contains the code to host your own back-end and the code to compile your own .APK to install on your phone.
The only thing you need to do is arrange your own server, an android phone and you're good to go ;)

## Features
- [ ] Add multiple cars
- [ ] Add commute information
    - [ ] Add current mileage
    - [ ] Add date of commute
    - [ ] Add From-to location
    - [ ] Add End-of-commute mileage
      - [ ] Calculate based on given From-to location
- [ ] Add comments (Like took short-cut, alternative route, etc.)

## API
The API is created in Python with FastApi and PysonDb.
## Run API locally
1. Navigate to `api/python`
2. Create a Virtual environment (Windows: `python -m venv .venv`) 
3. Activate venv (Windows: `source .venv/Scripts/Activate`)
4. Run `pip install -r requirements.txt`
5. Run the following to start the application: `python src/app.py`
6. Navigate to localhost:8080

## API Docs
You can access the API locally docs on: [localhost:8080/docs](http://localhost:8080/docs).