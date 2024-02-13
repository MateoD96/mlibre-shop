export const getData = async <T>(endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    
    return data as T;

  } catch (error) {
    console.log(error);
    throw new Error("Ocurrio un error al obtener los datos");
  }
};
