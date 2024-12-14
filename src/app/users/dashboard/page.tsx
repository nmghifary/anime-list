import { AuthUserSessionSSR } from "@/libs/auth-libs-server";
import Image from "next/image";

interface IUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Pages = async () => {
  const user: IUser | undefined = await AuthUserSessionSSR();

  return (
    <div>
      <h3>Dashboard</h3>
      <h3>Welcome ... {user?.name}</h3>
      <Image
        src={user?.image || ""}
        alt={user?.name || "User Avatar"}
        width={100}
        height={100}
      />
    </div>
  );
};

export default Pages;
