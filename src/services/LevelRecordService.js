import httpClient from "../utils/httpClient";

export const getDashboardCategory = async () => {
  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");
  const data = await httpClient
    .get(`/dashboard/getDashboardCategory?idChild=${idChild}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => v.data);
  return data;
};

export const getDashboardTopic = async (idCategory) => {
  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");
  const data = await httpClient
    .get(
      `/dashboard/getDashboardTopic?idChild=${idChild}&idCategory=${idCategory}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((v) => v.data);
  return data;
};

export const getDashboardLevel = async (idTopic) => {
  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");
  const data = await httpClient
    .get(`/dashboard/getDashboardLevel?idChild=${idChild}&idTopic=${idTopic}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => v.data);
  return data;
};
