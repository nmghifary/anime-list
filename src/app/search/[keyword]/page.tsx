import GridList from "@/components/AnimeList/GridList";
import HeaderAnime from "@/components/AnimeList/HeaderAnime";

interface IParams {
  keyword: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const promise = await params;
  const keyword = promise.keyword;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}`
  );
  const searchAnime = await response.json();

  return (
    <>
      <section>
        <HeaderAnime title={`Pencarian untuk ${keyword}...`} />
        <GridList api={searchAnime} />
      </section>
    </>
  );
};

export default Page;
