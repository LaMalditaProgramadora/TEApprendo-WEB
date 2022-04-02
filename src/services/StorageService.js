export const saveAll = (data) => {
  localStorage.setItem("idChild", data.specialist.child.idChild);
  localStorage.setItem("username", data.specialist.username);
  localStorage.setItem("token", data.token);
  localStorage.setItem(
    "childName",
    data.specialist.child.names + " " + data.specialist.child.lastNames
  );
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const getIdChild = () => {
  return localStorage.getItem("idChild");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getChildName = () => {
  return localStorage.getItem("childName");
};

export const removeAll = () => {
  localStorage.removeItem("idChild");
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("chilName");
};
