// "use  client";

import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex gap-4 text-accent items-center justify-center">
        <span className="text-2xl ">LOGO</span>
        <h3 className="text-4xl font-bold pl-4 border-l-4 border-l-accent">
          404 NOT FOUND
        </h3>
      </div>
      <Link href={"/"} className="text-l underline hover:text-accent">
        back...
      </Link>
    </div>
  );
};

export default Page;
