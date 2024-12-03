import Link from "next/link";
import SearchButton from "./InputSearch";

const Navbar = () => {
  return (
    <header>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 shadow-2xl">
        <Link href={`/`} className="font-extrabold text-2xl ">
          Cuy AnimeList
        </Link>
        <SearchButton />
      </div>
    </header>
  );
};

export default Navbar;
