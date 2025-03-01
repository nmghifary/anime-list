import Image from "next/image";
import Link from "next/link";

export interface IApi {
  pagination?: { last_visible_page: number };
  data?: Array<IData>;
}

interface IData {
  mal_id: number;
  title: string;
  images: { webp: { image_url: string } };
}

const GridList = ({ api }: { api: IApi }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 px-4">
      {api.data?.map((data: IData) => (
        <div
          key={data.mal_id}
          className="shadow-xl w-full h-full hover:text-accent"
        >
          <Link href={`/detail/anime/${data.mal_id}`} className="block">
            <Image
              src={data.images.webp.image_url}
              alt={data.title}
              width={200}
              height={300}
              className="aspect-[3/4] object-cover rounded-lg"
              loading="lazy"
            />
            <h3 className="text-center mt-2 text-sm font-medium">
              {data.title}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GridList;
