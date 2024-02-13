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
  const subcat = params.filtersProducts[0];

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

        <div>
          <Suspense fallback={<h3>Loading...</h3>}>
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
