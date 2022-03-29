const API = "https://nicolas-security.herokuapp.com/ingreso";

//const API = "http://localhost:4000/ingreso";

export const getIngresos = async () => {
  const res = await fetch(`${API}`);
  return await res.json();
};

export const getIngresoColaboradores = async () => {
  const res = await fetch(`${API}/colaboradores`);
  return await res.json();
};

export const saveIngreso = async (newIngreso) => {
  const res = await fetch(`${API}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newIngreso),
  });
  return await res.json();
};

export const getIngreso = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
};
