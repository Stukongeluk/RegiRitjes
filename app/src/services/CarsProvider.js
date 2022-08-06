import {baseUrl, port} from '../../app.json';

export const getAllCars = () => {
  return fetch(`http://${baseUrl}:${port}/cars/`, {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
};

export const getCarById = (carId: Number) => {
  return fetch(`http://${baseUrl}:${port}/cars/${carId}`, {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
};
