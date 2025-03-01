import { getApiResponse } from "@/libs/api-libs";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import { AuthUserSessionSSR } from "@/libs/auth-libs-server";
import CollectionButton from "@/components/AnimeList/CollectionButton";
import Comment from "@/components/Comment";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const detailAnime = await getApiResponse(`anime/${id}`);
  const user = await AuthUserSessionSSR();

  return (
    <div>
      <div className="m-4 space-y-4">
        <div className="flex items-center gap-4 w-full">
          <h3 className="grow text-4xl font-bold">{detailAnime.data.title}</h3>
          <CollectionButton
            user_email={user?.email}
            anime_mal_id={detailAnime.data.mal_id}
            anime_image={detailAnime.data.images.webp.image_url}
            anime_title={detailAnime.data.title}
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center">
          <div className="w-[70%] md:w-[30%]">
            <Image
              src={detailAnime.data.images.webp.image_url}
              alt={detailAnime.data.title}
              width={600}
              height={600}
              className="aspect-[3/4] object-cover"
            />
          </div>
          <div className="w-full">
            <div className="flex gap-4 border-b-2 border-b-white">
              <button>Details</button>
              <button>Characters</button>
              <button>Episodes</button>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-2 items-stretch">
              <div className="flex gap-4 bg-slate-700 border-slate-500 border-2 w-full rounded mt-2 md:my-2 py-4">
                <div className="w-full sm:w-[15%] border-r-2 border-r-slate-800 relative">
                  <div className="justify-center items-center text-center">
                    <div className="inline-flex bg-accent rounded-md py-0.5 px-1 m-auto">
                      <p>SCORE</p>
                    </div>
                    <p className="text-4xl font-bold">
                      {detailAnime.data.score}
                    </p>
                    <p className="text-sm">
                      {detailAnime.data.scored_by} users
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex gap-4 text-xl sm:text-2xl pr-2">
                    <p>
                      Ranked{" "}
                      <span className="font-bold">
                        #{detailAnime.data.rank}
                      </span>
                    </p>
                    <p>
                      Popularity{" "}
                      <span className="font-bold">
                        #{detailAnime.data.popularity}
                      </span>
                    </p>
                    <p>
                      Members{" "}
                      <span className="font-bold">
                        #{detailAnime.data.members}
                      </span>
                    </p>
                  </div>
                  <div className="flex absolute bottom-0 text-accent">
                    <p className="pr-2">
                      {detailAnime.data.season} {detailAnime.data.year}
                    </p>
                    <p className="border-slate-800 border-x-2 px-2">
                      {detailAnime.data.type}
                    </p>
                    <p className="pl-2">{detailAnime.data.source}</p>
                  </div>
                </div>
              </div>
              {/* layar besar */}
              <div className="hidden md:block w-[30%] my-2">
                <VideoPlayer
                  youtubeId={detailAnime.data.trailer.youtube_id}
                  heightVideo={125}
                />
              </div>
              {/* layar kecil */}
              <div className="block md:hidden w-full">
                <VideoPlayer
                  youtubeId={detailAnime.data.trailer.youtube_id}
                  heightVideo={210}
                />
              </div>
            </div>
            <section className="text-justify">
              <h3 className="my-2 border-b-2 font-semibold">Synopsis</h3>
              <p>{detailAnime.data.synopsis}</p>
            </section>
            <section className="text-justify">
              <h3 className="my-2 border-b-2 font-semibold">Background</h3>
              <p>{detailAnime.data.background}</p>
            </section>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Comment
          anime_mal_id={detailAnime.data.mal_id}
          anime_image={detailAnime.data.images.webp.image_url}
          user_email={user?.email}
          user_image={user?.image}
          username={user?.name}
        />
      </div>
    </div>
  );
};

export default Page;
