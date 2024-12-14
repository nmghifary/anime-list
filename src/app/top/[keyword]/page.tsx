"use client";

import GridList from "@/components/AnimeList/GridList";
import Pagination from "@/components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getApiResponse } from "@/libs/api-libs";

interface IApi {
  pagination?: IPagination;
  data?: Array<IData>;
}
interface IData {
  mal_id: number;
  title: string;
  images: { webp: { image_url: string } };
}
interface IPagination {
  last_visible_page: number;
}

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = pathname.split("/").pop();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [data, setData] = useState<IApi>({});
  const lastPage: number = data.pagination?.last_visible_page || currentPage;

  useEffect(() => {
    const fecthData = async () => {
      const result = await getApiResponse(
        `top/${keyword}`,
        `page=${currentPage}`
      );
      setData(result);
    };
    fecthData();
  }, [currentPage, keyword]);

  const handleChangePage = (page: number): void => {
    const scrollToTop = () => {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    router.push(`?page=${page}`);
    scrollToTop();
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        handleOnClick={handleChangePage}
      />
      <GridList api={data} />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        handleOnClick={handleChangePage}
      />
    </div>
  );
};

export default Page;
