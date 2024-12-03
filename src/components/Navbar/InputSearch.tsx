"use client";

import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useRef } from "react";

const SearchButton = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSearch = () => {
    const keyword = searchRef.current?.value;
    if (keyword) {
      router.push(`/search/${keyword}`);
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };
  const handleClick = (event: FormEvent) => {
    if (event.type === "click") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        placeholder="pencarian ..."
        className="w-full rounded-md p-2"
        ref={searchRef}
        onKeyDown={handleEnter}
      />
      <button onClick={handleClick} className="absolute top-2 end-2">
        logo
      </button>
    </div>
  );
};

export default SearchButton;
