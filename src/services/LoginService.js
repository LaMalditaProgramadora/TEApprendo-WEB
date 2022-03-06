import httpClient from "../utils/httpClient";

export const login = async (login) => {
  const data = await httpClient.post("/specialists/login", login).then((v) => {
    return v.data;
  });
  return data;
};
