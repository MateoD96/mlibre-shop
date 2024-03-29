import { getData } from "@/app/lib/utils";
import { Filtros, Products } from "./definitions";

export const apiProducts = {
  baseUrl:
    "http://localhost:1337/api/productos?populate[image]=image&pagination[pageSize]=5&populate[subsub_categorie][fields][0]=slug&filters[subsub_categorie][slug][$eq]=",

  async getFiltersProducts(subcategory?: string) {
    const filtros = await getData<Filtros>(
      `http://localhost:1337/api/filtros?fields[0]=title&filters[subsub_categories][slug][$eq]=${subcategory}&populate[sub_filtros][fields][0]=title&populate[sub_filtros][fields][1]=slug`
    );

    return filtros.data;
  },

  async getProducts(params: string[]) {
    const regex = /index[^\/]+$/;
    const pageInfo = params.join("/").match(regex)?.[0]?.match(/\d+/g) ?? [];
    const paramsQuery = params.filter((p) => !p.includes("indexPage"));

    const query =
      paramsQuery.length > 2
        ? paramsQuery.slice(2).reduce((acc, param, i) => {
            return acc.concat(
              `&filters[$and][${i}][sub_filtros][slug][$eq]=${param}`
            );
          }, `${this.baseUrl}${params[1]}`)
        : `${this.baseUrl}${params[1]}`;

    return await getData<Products>(
      query.concat(`&pagination[page]=${pageInfo[0] || 1}`)
    );
  },
};

/* 
("http://localhost:1337/api/productos?populate[image]=image&pagination[pageSize]=5&populate[subsub_categorie][fields][0]=slug&filters[subsub_categorie][slug][$eq]=consolas-1&populate[sub_filtros][fields][0]=slug&filters[$and][0][sub_filtros][slug][$eq]=discount_10-100&filters[$and][1][sub_filtros][slug][$eq]=nintendo"); */
