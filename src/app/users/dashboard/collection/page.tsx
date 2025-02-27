import Header from "@/components/Dashboard/Header";
import { prisma } from "@/libs/prisma-client";
import { AuthUserSessionSSR } from "@/libs/auth-libs-server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Pages = async () => {
  const user = await AuthUserSessionSSR();
  const collection = await prisma.collection.findMany({
    where: { user_email: user?.email as string | undefined },
  });

  return (
    <div className="p-4 space-y-4">
      <Header title={"My Collection"} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection?.map((collect) => {
          return (
            <Link
              href={`/detail/anime/${collect.anime_mal_id}`}
              key={collect.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={collect.anime_image || ""}
                alt={collect.anime_title || "Anime Image"}
                width={250}
                height={250}
                className="w-full"
              />
              <h3 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 w-full bg-black bg-opacity-30 backdrop-blur-lg font-semibold text-xl p-1 text-center transition-transform duration-500 ease-in-out shadow-md">
                {collect.anime_title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Pages;
