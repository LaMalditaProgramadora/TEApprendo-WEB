import httpClient from "../utils/httpClient";

export const getCategories = async () => {
  const token = localStorage.getItem("token");
  const data = await httpClient
    .get("/categories/list", {
      headers: {
        Authorization: token,
      },
    })
    .then((v) => v.data);
  return data;
};
