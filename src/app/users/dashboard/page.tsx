import { AuthUserSessionSSR } from "@/libs/auth-libs-server";
import Image from "next/image";
import Link from "next/link";

interface IUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Pages = async () => {
  const user: IUser | undefined = await AuthUserSessionSSR();

  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex flex-row gap-4 text-2xl">
        <Image
          src={user?.image || ""}
          alt={user?.name || "Avatar User"}
          width={250}
          height={250}
          className="max-w-44"
        />
        <div className="flex flex-col items-center justify-center">
          <h3 className="self-start">Welcome ...</h3>
          <h3 className="text-4xl text-accent">{user?.name}</h3>
        </div>
      </div>
      <div className="flex flex-row gap-4 text-slate-700 font-semibold text-l *:flex-auto *:bg-accent *:rounded-lg *:p-1 *:items-center *:text-center">
        <Link
          href="/users/dashboard/collection"
          className="hover:bg-yellow-300"
        >
          My Collection
        </Link>
        <Link href="/users/dashboard/comment" className="hover:bg-yellow-300">
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default Pages;
