import {baseUrl, port} from '../../app.json';

const carUrl = `http://${baseUrl}:${port}/cars`;

export const getAllCars = () => {
  return fetch(carUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const getCarById = (carId: Number) => {
  return fetch(`${carUrl}/${carId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const saveCar = (car: any) => {
  return fetch(`${carUrl}`, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const updateCar = (car_id, car) => {
  return fetch(`${carUrl}/${car_id}`, {
    method: 'PUT',
    body: JSON.stringify(car),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const deleteCar = (car_id) => {
  return fetch(`${carUrl}/${car_id}`, {
    method: 'DELETE',
    body: null,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json', 
    }
  });
}
