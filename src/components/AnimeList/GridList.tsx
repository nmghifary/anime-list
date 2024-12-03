import Image from "next/image";
import Link from "next/link";

interface IApi {
  data: Array<IAnime>;
}
interface IAnime {
  mal_id: number;
  title: string;
  images: { webp: { image_url: string } };
}

const GridList = ({ api }: { api: IApi }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 px-4">
      {api.data.map((anime: IAnime, index: number) => {
        return (
          <div key={index} className="shadow-xl w-full h-full">
            <Link href={`/${anime.mal_id}`} className="cursor-pointer">
              <Image
                src={anime.images.webp.image_url}
                alt="..."
                width={600}
                height={600}
                className="aspect-[3/4] object-cover"
              />
              <h3>{anime.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default GridList;
