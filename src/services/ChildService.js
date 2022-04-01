import httpClient from "../utils/httpClient";

export const getChild = async () => {
  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");
  const data = await httpClient
    .get(`/children/listByIdChild?idChild=${idChild}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => v.data);
  return data;
};