import Link from "next/link";
import InputSearch from "./InputSearch";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 shadow-2xl bg-accent text-black">
        <Link href={`/`} className="font-extrabold text-2xl ">
          Cuy AnimeList
        </Link>
        <InputSearch />
      </div>
    </header>
  );
};

export default Navbar;
