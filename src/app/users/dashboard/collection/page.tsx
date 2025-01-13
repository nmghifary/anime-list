import Header from "@/components/Collection/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Pages = () => {
  return (
    <div className="p-4 space-y-4">
      <Header title={"My Collection"} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link href="" className="relative rounded-xl overflow-hidden group">
          <Image src="" alt="" width={250} height={250} className="w-full" />
          <h3 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 w-[90%] rounded-t-xl bg-accent bg-opacity-30 backdrop-blur-lg font-semibold text-xl p-1 text-center items-center transition-all duration-300">
            Title
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Pages;
