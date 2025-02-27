"use client";

import { timeAgo } from "@/utils/formatDate";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { LuDot } from "react-icons/lu";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import ButtonUser from "./ButtonUser";

export interface ICommentBox {
  id: string;
  user_email: string;
  username: string;
  user_image: string;
  created_at: Date;
  content: string;
  likes: ILikes[];
  parent_id: string | null;
}

interface ILikes {
  user_email: string;
}

const CommentBox = ({
  comment,
  user_email,
  handleRepliesComment,
  childComments,
  refresh,
}: {
  comment: ICommentBox;
  user_email: string | null | undefined;
  handleRepliesComment: (id: string, username: string) => void;
  childComments: ICommentBox[] | null;
  refresh: () => void;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    user_email
      ? comment.likes.some((like) => like.user_email === user_email)
      : false
  );

  const hadleButtonLikes = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!user_email) return signIn("github");

    let response;
    if (!isLiked) {
      response = await fetch("/api/v1/like", {
        method: "POST",
        body: JSON.stringify({
          comment_id: comment.id,
          user_email,
        }),
      });
    } else {
      response = await fetch("/api/v1/like", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_id: comment.id,
          user_email,
        }),
      });
    }
    const result = await response.json();
    if (result.status === 200 || result.status === 201) {
      setIsLiked(!isLiked);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex w-full items-start gap-4 mb-2">
        <div>
          <Image
            src={comment.user_image || ""}
            alt={comment.username || "Avatar User"}
            width={250}
            height={250}
            className="max-w-8 max-h-8 rounded-full"
          />
          <div className="h-full ml-3 w-2 bg-slate-500" />
        </div>
        <div className="flex flex-grow flex-col text-slate-200">
          <div className="flex gap-x-0.5 items-center">
            <h3> {comment.username} </h3>
            <LuDot />
            <h3 className="text-slate-400"> {timeAgo(comment.created_at)} </h3>
          </div>
          <p>{comment.content}</p>
          <div className="flex text-l gap-6 py-2">
            <div className="flex flex-row gap-1">
              <button
                onClick={hadleButtonLikes}
                className="flex rounded-full justify-center items-center hover:bg-slate-500 text-lg w-6"
              >
                {isLiked ? <RiThumbUpFill /> : <RiThumbUpLine />}
              </button>
              <h3>{comment.likes.length}</h3>
            </div>
            <button
              onClick={() => handleRepliesComment(comment.id, comment.username)}
              className="w-8 text-xl"
            >
              <BiCommentDetail />
            </button>
          </div>
        </div>
        <ButtonUser
          email={user_email}
          user_email={comment.user_email}
          comment_id={comment.id}
          refresh={refresh}
        />
      </div>
      <div className="ml-12">
        {childComments
          ?.filter((c: ICommentBox) => c.parent_id === comment.id)
          .map((comment: ICommentBox) => {
            return (
              <CommentBox
                key={comment.id}
                comment={comment}
                user_email={user_email}
                handleRepliesComment={handleRepliesComment}
                childComments={childComments}
                refresh={refresh}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CommentBox;
