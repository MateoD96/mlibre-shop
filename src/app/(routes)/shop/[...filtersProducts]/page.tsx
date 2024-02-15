import { Wrapper, Breadcrumbs } from "@/app/components";
import { Products } from "./components";
import { Suspense } from "react";
import { apiProducts } from "./lib/data";
import { FiltersProducts } from "./components";

interface Props {
  params: {
    filtersProducts: string[];
  };
  searchParams: {
    query: string;
  };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const query = searchParams.query || "";
  const resp = await apiProducts.getProducts(params.filtersProducts);
  //we get the subcategory related to the products to get the filters related to the subcategory
  const subcat = resp.data[0]?.attributes.subsub_categorie.data.attributes.slug;

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
          <div className=" order-2 md:w-3/4">
            {resp &&
              resp.data?.map((data) => (
                <h3 key={data.id}>{data.attributes.title}</h3>
              ))}
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
