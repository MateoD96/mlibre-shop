"use client";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const { push } = useRouter();

  const handleChange = (value: string) => setQuery(value);

  const handleClick = () => {
    if (query) push(`search?q=${query.toString()}`);
  };

  return (
    <div className=" relative">
      <input
        className=" outline-none p-1 w-60 md:w-80"
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        name="query"
        id="query"
      />
      <button
        className="absolute right-1 bottom-1 font-bold text-xl text-gray-600 bg-white z-10 border-x-grey-600"
        onClick={() => handleClick()}
      >
        <CiSearch />
      </button>
    </div>
  );
}
