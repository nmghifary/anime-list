"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleClickBack = (event: FormEvent) => {
    event.preventDefault();
    router.back();
  };

  return (
    <div className="flex justify-between w-full items-center">
      <button
        onClick={handleClickBack}
        className="text-2xl text-accent font-bold"
      >
        <IoMdArrowRoundBack />
      </button>
      <h3 className="font-bold text-2xl">{title}</h3>
    </div>
  );
};

export default Header;
