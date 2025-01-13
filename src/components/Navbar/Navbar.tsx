import Link from "next/link";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import UserActionButton from "./UserActionButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (
        currentScrollPosition > lastScrollPosition &&
        currentScrollPosition > 50
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-transform duration-300 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 py-2 shadow-xl bg-accent text-black">
        <Link href={"/"} className="font-extrabold text-2xl ">
          Cuy AnimeList
        </Link>
        <div className="flex flex-col sm:flex-row gap-2">
          <InputSearch />
          <div className="flex justify-between items-center gap-2">
            {session ? (
              <Link
                href={"/users/dashboard"}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-accent font-bold"
              >
                Dashboard
              </Link>
            ) : null}
            <UserActionButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
