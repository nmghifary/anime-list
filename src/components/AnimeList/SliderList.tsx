import Image from "next/image";
import Link from "next/link";

interface IApi {
  data?: Array<IData>;
}
interface IData {
  mal_id: number;
  title: string;
  images: { webp: { image_url: string } };
}

const SliderList = ({ api }: { api: IApi }) => {
  return (
    <div className="w-full h-full flex gap-4 overflow-x-auto snap-x snap-mandatory transition-all no-scrollbar">
      {api.data?.map((data: IData, index: number) => {
        return (
          <div
            key={index}
            className="shadow-xl w-full min-w-36 h-full min-h-[20%] snap-start"
          >
            <Link
              href={`/detail/manga/${data.mal_id}`}
              className="cursor-pointer hover:text-accent"
            >
              <Image
                src={data.images.webp.image_url}
                alt="..."
                width={600}
                height={600}
                className="aspect-[3/4] object-cover"
                loading="lazy"
              />
              <h3>{data.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SliderList;
