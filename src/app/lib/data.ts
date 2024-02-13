import { Subcategories } from "./definitions";
import { getData } from "./utils";

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
