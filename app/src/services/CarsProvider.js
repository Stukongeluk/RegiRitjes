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
