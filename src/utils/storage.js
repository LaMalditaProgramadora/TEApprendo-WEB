export const saveStorage = async (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("idChild", data.specialist.child.idChild);
  localStorage.setItem(
    "nameChild",
    data.specialist.child.names + " " + data.specialist.child.lastNames
  );
  localStorage.setItem("username", data.specialist.username);
};

export const saveChild = async (data) => {
  localStorage.setItem("names", data.names);
  localStorage.setItem("lastNames", data.lastNames);
  localStorage.setItem("birthday", data.birthday);
  localStorage.setItem("gender", data.gender);
  localStorage.setItem("asdLevel", data.asdLevel);
};

export const resetStorage = async (data) => {
  localStorage.removeItem("token");
  localStorage.removeItem("idChild");
  localStorage.removeItem("nameChild");
  localStorage.removeItem("username");
};
