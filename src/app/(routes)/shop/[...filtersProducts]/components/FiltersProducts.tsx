import { CiCircleRemove } from "react-icons/ci";
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

  return (
    <div className=" order-1 mb-6 sm:mb-0 sm:w-[27%] w-full">
      {/* FIXME: name param in view*/}
      <div>
        {filtersParams.slice(2).map((filter) => (
          <Link
            key={filter}
            href={`/shop/${removeParamUrl(filtersParams, filter)}`}
            className=" bg-slate-200 p-1 rounded-xl relative inline-flex items-center text-gray-500 mr-2 mt-2"
          >
            <span>{filter}</span>
            <CiCircleRemove className=" mx-1" />
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
