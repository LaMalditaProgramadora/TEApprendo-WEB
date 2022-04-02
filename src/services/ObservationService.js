import httpClient from "../utils/httpClient";
import { getToken } from "./StorageService";

export const getObservation = async () => {
  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");
  const data = await httpClient
    .get(`/dashboard/observations/listByIdChild?idChild=${idChild}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => v.data);
  return data;
};

export const addObservation = async (observation) => {
  const token = localStorage.getItem("token");
  const data = await httpClient
    .post(`/dashboard/observations/create`, observation, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => {
      return v.data;
    });
  return data;
};
export const updateObservation = async (observation) => {
  const token = localStorage.getItem("token");
  const data = await httpClient
    .put(`/dashboard/observations/update`, observation, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => {
      return v.data;
    });
  return data;
};

export const removeObservation = async (idObservation) => {
  const token = localStorage.getItem("token");
  const data = await httpClient
    .delete(`dashboard/observations/delete?idObservation=${idObservation}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => {
      return v.data;
    });
  return data;
};


