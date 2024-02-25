"use client";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import { Meta } from "../lib/definitions";
import { usePathname } from "next/navigation";
import { replacePageInUrl } from "../lib/utils";

interface Props {
  pages: Meta;
  params: string[];
}

export function Pagination({ pages, params }: Props) {
  const { pagination } = pages;
  const allPages = Array.from(Array(pagination.pageCount).keys(), (n) => n + 1);
  const currentPage = pagination.page;

  return (
    <>
      <div className=" flex justify-center">
        <PaginationArrow
          direction="left"
          page={currentPage - 1}
          isDisabled={currentPage <= 1}
        />
        <div className="flex -space-x-px">
          {allPages.map((page: number, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (String(page) === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                params={params}
                page={page}
                position={position}
                isActive={page === currentPage}
              />
            );
          })}
        </div>
        <PaginationArrow
          direction="right"
          page={currentPage + 1}
          isDisabled={currentPage >= pagination.pageCount}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  isActive,
  position,
}: {
  page: number;
  params: string[];
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-yellow-400 border-yellow-400 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );
  const pathname = usePathname();

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={replacePageInUrl(pathname, page)} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  page,
  direction,
  isDisabled,
}: {
  page: number;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const pathname = usePathname();

  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <FaArrowAltCircleLeft className=" w-4" />
    ) : (
      <FaArrowAltCircleRight className=" w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={replacePageInUrl(pathname, page)} className={className}>
      {icon}
    </Link>
  );
}
