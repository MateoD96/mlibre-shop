import { Subcategories } from "./definitions";

const getData = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocurrio un error al obtener los datos");
  }
};


export const api = {
  baseUrl: "http://localhost:1337/api",

  async getCategories() {
    const data = await getData(
      `${this.baseUrl}/categorias?populate[sub_categorias]=sub_categorias`
    );
    return data;
  },

  async getSubcategory(subcat: string) {
    const data = await getData(`${this.baseUrl}/sub-categorias/${subcat}`);
    return data as Subcategories;
  },
};
