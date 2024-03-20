import { Me, Subcategories } from "./definitions";
import { getData } from "./utils";

export const api = {
  baseUrl: `${process.env.URL_LOCAL}`,

  async getCategories() {
    const data = await getData(
      `${this.baseUrl}/categorias?populate[sub_categorias]=sub_categorias`
    );
    return data;
  },

  async getSubcategory(subcat: string) {
    const data = await getData<Subcategories>(
      `${this.baseUrl}/sub-categorias/${subcat}`
    );
    return data;
  },

  async getMe(currentUserToken: string, paramsUrl?: string) {
    const data = await getData<Me>(
      `${this.baseUrl}/users/me${paramsUrl || ""}`,
      { Authorization: `Bearer ${currentUserToken}` },
      { next: { tags: ["me"] } }
    );

    return data;
  },
};
