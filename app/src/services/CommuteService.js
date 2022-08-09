import {baseUrl, port} from '../../app.json';

const commuteRegistrationUrl = `http://${baseUrl}:${port}/commute_registrations`;

export const getAllCommuteRegistrations = () => {
  return fetch(commuteRegistrationUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const getAllCommuteRegistrationsByCarId = (carId: string) => {
  return fetch(`${commuteRegistrationUrl}/?car_id=${carId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export const saveCommuteRegistration = (commuteRegistration: any) => {
  return fetch(`${commuteRegistrationUrl}`, {
    method: 'POST',
    body: JSON.stringify(commuteRegistration),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
