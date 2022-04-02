import httpClient from "../utils/httpClient";
import { getToken } from "./StorageService";

export const getChild = async (idChild) => {
  const data = await httpClient
    .get(`/children/listByIdChild?idChild=${idChild}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};
