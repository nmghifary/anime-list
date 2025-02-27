import Header from "@/components/Dashboard/Header";
import { prisma } from "@/libs/prisma-client";
import { AuthUserSessionSSR } from "@/libs/auth-libs-server";
import Image from "next/image";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
import { timeAgo } from "@/utils/formatDate";
import ButtonUser from "@/components/Comment/ButtonUser";

const Pages = async () => {
  const user = await AuthUserSessionSSR();
  const comments = await prisma.comment.findMany({
    where: { user_email: user?.email as string | undefined },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="p-4 space-y-4">
      <Header title={"My Comments"} />
      <div className="flex flex-col gap-4">
        {comments?.map((comment) => {
          return (
            <div
              key={comment.id}
              className="flex w-full items-start gap-4 mb-2"
            >
              <Image
                src={comment.user_image || ""}
                alt={comment.username || "Avatar User"}
                width={250}
                height={250}
                className="max-w-8 max-h-8 rounded-full"
              />
              <div className="flex flex-grow flex-col text-slate-200">
                <div className="flex gap-x-0.5 items-center">
                  <h3> {comment.username} </h3>
                  <LuDot />
                  <h3 className="text-slate-400">
                    {" "}
                    {timeAgo(comment.created_at)}{" "}
                  </h3>
                </div>
                <p>{comment.content}</p>
              </div>
              <Link href={`/detail/anime/${comment.anime_mal_id}`}>
                <Image
                  src={comment.anime_image || ""}
                  alt={"Anime Image"}
                  width={250}
                  height={250}
                  className="max-w-24"
                />
              </Link>
              <ButtonUser
                email={user?.email}
                user_email={comment.user_email}
                comment_id={comment.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pages;
