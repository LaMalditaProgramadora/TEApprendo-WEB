import httpClient from "../utils/httpClient";

export const getTopicsByIdCategory = async (idCategory) => {
  const token = localStorage.getItem("token");
  const data = await httpClient
    .get(`/topics/listByIdCategory?idCategory=${idCategory}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => v.data);
  return data;
};
