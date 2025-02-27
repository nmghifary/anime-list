"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { signIn } from "next-auth/react";

interface ICommentSubmit {
  user_email: string | null | undefined;
  username: string | null | undefined;
  user_image: string | null | undefined;
  anime_mal_id: string;
  anime_image: string;
  parent_id: string | null;
  refresh: () => void;
}

const CommentSubmit = ({
  user_email,
  username,
  user_image,
  anime_mal_id,
  anime_image,
  parent_id = null,
  refresh,
}: ICommentSubmit) => {
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user_email) return signIn("github");

    if (!content.trim() && content.length < 4) {
      return;
    }

    const response = await fetch("/api/v1/comment", {
      method: "POST",
      body: JSON.stringify({
        content,
        user_email,
        username,
        user_image,
        anime_mal_id,
        anime_image,
        parent_id,
      }),
    });
    const postComment = await response.json();

    if (postComment.status === 201) {
      setContent("");
      refresh();
    }
    return;
  };

  return (
    <div className="flex w-full items-center border-b-2 border-slate-700 p-4 py-2 gap-4">
      <Image
        src={user_image || "/avatar_profile.jpg"}
        alt={username || "Avatar User"}
        width={250}
        height={250}
        className="max-w-12 rounded-full"
      />
      <textarea
        ref={textareaRef}
        placeholder="Add a comment..."
        value={content}
        onChange={handleTextArea}
        rows={1}
        className="inline-flex flex-grow p-2 border-0 bg-transparent placeholder-slate-200 font-medium items-center focus:border-transparent focus:outline-none"
      />
      <button onClick={handleSubmit} className="text-2xl">
        <IoMdSend />
      </button>
    </div>
  );
};

export default CommentSubmit;
