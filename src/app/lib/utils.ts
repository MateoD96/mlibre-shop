interface Headers {
  headers: {
    Authorization?: string;
    "Content-Type"?: string;
  };
}

export const getData = async <T>(endpoint: string, options?: Headers) => {
  try {
    const res = await fetch(endpoint, options);

    if (!res.ok) {
      throw new Error(`Ups,Ocurrio un error al obtener los datos`);
    }

    const data = await res.json();

    return data as T;
  } catch (error) {
    console.log(error);
    throw new Error("Ocurrio un error al obtener los datos");
  }
};

// TODO: recibir los datos previamente validados
export const postData = async (
  data: unknown,
  url: string,
  options?: Headers
) => {
  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const defaultOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const resp = await fetch(`${url || ""}`, defaultOptions);

    return await resp.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error posting data");
  }
};
