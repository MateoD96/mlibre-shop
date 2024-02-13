import { apiProducts } from "../lib/data";
import { Filters } from "./FiltersItems";
import Link from "next/link";

interface Props {
  filtersParams: string[];
  subcat: string;
}

export async function FiltersProducts({ filtersParams, subcat }: Props) {
  const filtersProds = await apiProducts.getFiltersProducts(subcat);

  const removeParamUrl = (params: string[], elemRemove: string) => {
    return params
      .filter((filter) => (filter !== elemRemove ? filter : null))
      .join("/");
  };

  console.log(filtersParams);

  return (
    <div>
      <div>
        {/* FIXME: name param in view */}
        {filtersParams.slice(2).map((filter) => (
          <Link
            key={filter}
            href={`/shop/${removeParamUrl(filtersParams, filter)}`}
          >
            {filter}
          </Link>
        ))}
      </div>

      {filtersProds && (
        <Filters
          filtros={filtersProds}
          subcat={subcat}
          filtersParams={filtersParams}
        />
      )}
    </div>
  );
}
