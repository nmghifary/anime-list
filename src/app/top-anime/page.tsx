"use client";

import GridList from "@/components/AnimeList/GridList";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

interface IPagination {
  last_visible_page: number;
}
interface IAnime {
  mal_id: number;
  title: string;
  images: { webp: { image_url: string } };
}
interface IApi {
  pagination?: IPagination;
  data?: Array<IAnime>;
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<IApi>({});

  useEffect(() => {
    const fecthData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${currentPage}`
      );
      const result = await response.json();
      setData(result);
    };
    fecthData();
  }, [currentPage]);
  const lastPage: number = data.pagination?.last_visible_page || currentPage;

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
      />
      <GridList api={data} />
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Page;
