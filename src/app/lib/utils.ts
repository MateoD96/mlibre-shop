interface Headers {
  "Content-Type"?: string;
  Authorization?: string;
}

interface CacheOptions {
  cache?: string;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export const getData = async <T>(
  endpoint: string,
  options?: Headers,
  cacheOpt?: CacheOptions
) => {
  try {
    const res = await fetch(endpoint, {
      [cacheOpt?.cache ? "cache" : "next"]: cacheOpt?.next || cacheOpt?.cache,
      headers: { ...options },
    });

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

export const postData = () => {
  const defaultOptions = {
    method: "",
    headers: { "Content-Type": "application/json" },
    body: "JSON DATA",
  };

  const fetching = async (endpoint: string) => {
    try {
      const resp = await fetch(`${endpoint || ""}`, defaultOptions);
      return await resp.json();
    } catch (error) {
      console.log(error);
      throw new Error("Error posting data");
    }
  };

  const insert = async (
    endpoint: string,
    data: unknown,
    comingOptions?: Headers
  ) => {
    defaultOptions.method = "POST";
    defaultOptions.body = JSON.stringify(data);
    const headers = { ...defaultOptions.headers, ...comingOptions };
    defaultOptions.headers = headers;

    return await fetching(endpoint);
  };

  const update = async (
    endpoint: string,
    data: unknown,
    comingOptions?: Headers
  ) => {
    defaultOptions.method = "PUT";
    defaultOptions.body = JSON.stringify(data);
    const headers = { ...defaultOptions.headers, ...comingOptions };
    defaultOptions.headers = headers;
    return await fetching(endpoint);
  };

  return {
    insert,
    update,
  };
};

export const deleteData = async (endpoint: string, headers?: Headers) => {
  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { ...headers },
    });

    if (!res.ok) {
      throw new Error(`Error fetching ${endpoint}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting data");
  }
};
