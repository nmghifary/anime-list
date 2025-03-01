import { getApiResponse } from "@/libs/api-libs";
import GridList from "@/components/AnimeList/GridList";
import HeaderAnime from "@/components/AnimeList/HeaderAnime";

const Page = async (props: { params: Promise<{ keyword: string }> }) => {
  const { keyword } = await props.params;
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
