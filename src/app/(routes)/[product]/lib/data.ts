import { getData } from "@/app/lib/utils";
import { Product } from "../../shop/[...filtersProducts]/lib/definitions";

export const apiProduct = {
  baseUrl: "http://localhost:1337/api/productos",

  async getProduct(id: string) {
    return await getData<Product>(`${this.baseUrl}/${id}`);
  },
};
