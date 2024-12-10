import getApiResponse from "@/app/libs/api-libs";
import GridList from "@/components/AnimeList/GridList";
import HeaderAnime from "@/components/AnimeList/HeaderAnime";

interface IParams {
  keyword: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const promise = await params;
  const keyword = promise.keyword;
  const decodeKeyword = decodeURI(keyword);
  const searchAnime = await getApiResponse("anime", `q=${decodeKeyword}`);

  return (
    <>
      <section>
        <HeaderAnime title={`Pencarian untuk ${decodeKeyword}...`} />
        <GridList api={searchAnime} />
      </section>
    </>
  );
};

export default Page;
