const API = "https://nicolas-security.herokuapp.com/cierre";

export const getCierres = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const getCierrelocales = async () => {
  const res = await fetch(`${API}/locales`);
  return await res.json();
};

export const saveCierre = async (newCierre) => {
  const res = await fetch(`${API}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newCierre),
  });
  return await res.json();
};
