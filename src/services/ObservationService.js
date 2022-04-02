import httpClient from "../utils/httpClient";
import { getToken } from "./StorageService";

export const getObservation = async (idChild) => {
  const data = await httpClient
    .get(`/dashboard/observations/listByIdChild?idChild=${idChild}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const addObservation = async (observation) => {
  const data = await httpClient
    .post(`/dashboard/observations/create`, observation, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => {
      return v.data;
    });
  return data;
};
export const updateObservation = async (observation) => {
  const data = await httpClient
    .put(`/dashboard/observations/update`, observation, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => {
      return v.data;
    });
  return data;
};

export const removeObservation = async (idObservation) => {
  const data = await httpClient
    .delete(`dashboard/observations/delete?idObservation=${idObservation}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => {
      return v.data;
    });
  return data;
};
