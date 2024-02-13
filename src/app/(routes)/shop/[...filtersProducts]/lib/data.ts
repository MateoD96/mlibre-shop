import { getData } from "@/app/lib/utils"
import { Filtros } from "./definitions"


export const apiProducts = {
  baseUrl: "http://localhost:1337/api/productos?populate[image]=*&pagination[pageSize]=6&populate[subsub_categorie][fields][0]=slug&populate[subsub_categorie][populate][filtros][fields][0]=title&filters[subsub_categorie][slug][$eq]=",
  

  async getFiltersProducts(subcategory: string) {
    const filtros = await getData<Filtros>(`http://localhost:1337/api/filtros?fields[0]=title&filters[sub_categorias][slug][$eq]=${subcategory}&populate[sub_filtros][fields][0]=title&populate[sub_filtros][fields][1]=slug`)  

    return filtros.data;
  },


  async getProducts() {

  }


}