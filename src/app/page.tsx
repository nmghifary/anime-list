import HeaderAnime from "@/components/AnimeList/HeaderAnime";
import GridList from "@/components/AnimeList/GridList";
import SliderList from "@/components/AnimeList/SliderList";

const Page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`
  );
  const topAnime = await response.json();

  return (
    <>
      <section>
        <HeaderAnime title="Top Anime" linkHref="/top-anime" />
        <SliderList api={topAnime} />
      </section>
      <section>
        <HeaderAnime title="Top Anime" linkHref="/top-anime" />
        <GridList api={topAnime} />
      </section>
    </>
  );
};

export default Page;
