export const saveStorage = async (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("idChild", data.specialist.child.idChild);
  localStorage.setItem(
    "nameChild",
    data.specialist.child.names + " " + data.specialist.child.lastNames
  );
  localStorage.setItem("username", data.specialist.username);
};

export const resetStorage = async (data) => {
  localStorage.removeItem("token");
  localStorage.removeItem("idChild");
  localStorage.removeItem("nameChild");
  localStorage.removeItem("username");
};
