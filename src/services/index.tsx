import * as ApiEndPoints from '../constants/apiEndPoints';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export const getPlanets = async () => {
  const result = await fetch(ApiEndPoints.GET_PLANETS, {
    method: 'GET',
    headers: headers,
  });
  return await result.json();
};

export const getVehicles = async () => {
  const result = await fetch(ApiEndPoints.GET_VEHICLES, {
    method: 'GET',
    headers: headers,
  });
  return await result.json();
};
export const getToken = async () => {
  const result = await fetch(ApiEndPoints.GET_TOKEN, {
    method: 'POST',
    headers: headers,
  });
  return await result.json();
};

export const doFineFalCone = async (params: any) => {
  const result = await fetch(ApiEndPoints.GET_FIND_FALCONE, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params),
  });
  return await result.json();
};
