import Link from "next/link";

interface IParams {
  title: string;
  linkHref?: string;
}

const HeaderAnime = ({ title, linkHref }: IParams) => {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">{title} </h1>
      {linkHref ? (
        <Link
          href={linkHref}
          className="cursor-pointer text-l underline hover:scale-95 transition-all hover:text-accent"
        >
          see all...
        </Link>
      ) : null}
    </div>
  );
};

export default HeaderAnime;
