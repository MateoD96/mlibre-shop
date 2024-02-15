import { Wrapper, Breadcrumbs } from "@/app/components";
import { ProductsList } from "./components";
import { Suspense } from "react";
import { apiProducts } from "./lib/data";
import { FiltersProducts, Pagination } from "./components";

interface Props {
  params: {
    filtersProducts: string[];
  };
}

export default async function ProductsPage({ params }: Props) {
  const resp = await apiProducts.getProducts(params.filtersProducts);
  //we get the subcategory related to the products to get the filters related to the subcategory
  const subcat = resp.data[0]?.attributes.subsub_categorie.data.attributes.slug;

  if (resp.data.length === 0) return <h3>No se obtubieron resultados</h3>;

  return (
    <div>
      <Wrapper>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: params.filtersProducts[0],
              href: `/cat/${params.filtersProducts[0]}`,
            },
            {
              label: params.filtersProducts[1],
              href: `/shop/${params.filtersProducts[0]}/${params.filtersProducts[1]}`,
              active: true,
            },
          ]}
        />

        <div className=" flex flex-col sm:flex-row">
          <div className="order-2 md:w-3/4 bg-white rounded-md py-4 w-full my-4">
            <ProductsList products={resp} />
            <Pagination pages={resp.meta} params={params.filtersProducts} />
          </div>

          <Suspense fallback={<h3 className=" w-1/5">Loading...</h3>}>
            <FiltersProducts
              subcat={subcat}
              filtersParams={params.filtersProducts}
            />
          </Suspense>
        </div>
      </Wrapper>
    </div>
  );
}
