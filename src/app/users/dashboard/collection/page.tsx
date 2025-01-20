"use client";

import Header from "@/components/Collection/Header";
import { supabase } from "@/libs/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type CollectionItem = {
  id: number;
  user_email: string;
  anime_mal_id: string;
  anime_title: string;
  anime_image: string;
};

const Pages: React.FC = () => {
  const [datas, setDatas] = useState<CollectionItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("collection").select();

      if (data?.length == 0) {
        setDatas(null);
      } else {
        setDatas(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <Header title={"My Collection"} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {datas?.map((db, index: number) => {
          return (
            <Link
              href={`/detail/anime/${db.anime_mal_id}`}
              key={index}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={db.anime_image}
                alt={db.anime_title}
                width={250}
                height={250}
                className="w-full"
              />
              <h3 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 w-full bg-black bg-opacity-30 backdrop-blur-lg font-semibold text-xl p-1 text-center items-center transition-all duration-300 shadow-md">
                {db.anime_title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Pages;
