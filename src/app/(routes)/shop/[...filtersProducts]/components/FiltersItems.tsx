"use client";

import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useToggle } from "@/app/hooks";
import { FiltrosDatum } from "../lib/definitions";
import Link from "next/link";

interface FiltersItems {
  filtros: FiltrosDatum;
  subcat: string;
  filtersParams: string[];
}

function FiltersItems({ filtros, filtersParams }: FiltersItems) {
  const { toggle, active } = useToggle();

  const existFilter = filtros.attributes.sub_filtros.data.filter((sf) =>
    filtersParams.includes(sf.attributes.slug)
  );

  if (existFilter.length > 0) {
    return null;
  }

  return (
    <div className=" mt-2 mr-2">
      <div className=" flex items-center text-[.9rem] mr-2">
        <h4 className=" font-bold">{filtros.attributes.title}</h4>
        <span onClick={toggle} className=" mx-1 sm:hidden cursor-pointer">
          {!active ? <FaArrowAltCircleRight /> : <FaArrowAltCircleDown />}
        </span>
      </div>

      <ul
        className={`${
          active ? "block" : "hidden"
        } sm:block absolute  sm:relative z-10 bg-slate-800 text-white sm:text-gray-500 p-1 sm:p-0 sm:bg-transparent rounded-sm`}
      >
        {filtros.attributes.sub_filtros.data.map((item) => {
          return !filtersParams.includes(item.attributes.slug) ? (
            <li key={item.id} className=" p-1">
              <Link
                href={`/shop/${filtersParams.join("/")}/${
                  item.attributes.slug
                }`}
              >
                {item.attributes.title}
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

interface PropsFilters {
  filtros: FiltrosDatum[];
  subcat: string;
  filtersParams: string[];
}

export function Filters({ filtros, subcat, filtersParams }: PropsFilters) {
  return (
    <aside className=" relative flex flex-wrap sm:flex-col">
      {filtros.map((filter) => (
        <FiltersItems
          key={filter.id}
          filtros={filter}
          subcat={subcat}
          filtersParams={filtersParams}
        />
      ))}
    </aside>
  );
}
