"use client";

import { signIn } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface ICollectionButton {
  user_email: string | null | undefined;
  anime_mal_id: string;
  anime_title: string;
  anime_image: string;
}

const CollectionButton = ({
  user_email,
  anime_mal_id,
  anime_title,
  anime_image,
}: ICollectionButton) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user_email) return;

    const fetchData = async () => {
      const response = await fetch(
        `/api/v1/collection?user_email=${encodeURIComponent(
          user_email
        )}&anime_mal_id=${encodeURIComponent(anime_mal_id)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const collection = await response.json();
      if (collection.status == "200") {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };
    fetchData();
  }, [anime_mal_id, user_email]);

  const handleClickCollection = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!user_email) return signIn("github");
    // Jika tidak ada di db maka tambahkan
    let response;
    if (!isLiked) {
      response = await fetch("/api/v1/collection", {
        method: "POST",
        body: JSON.stringify({
          user_email,
          anime_mal_id,
          anime_title,
          anime_image,
        }),
      });
      // Jika ada di db maka hapus
    } else {
      response = await fetch("/api/v1/collection", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email, anime_mal_id }),
      });
    }
    const collection = await response.json();
    if (collection.status === 200 || collection.status === 201) {
      setIsLiked(!isLiked);
    }
  };

  return (
    <div>
      <button onClick={handleClickCollection} className="flex items-center">
        {isLiked ? (
          <IoHeart className="w-10 h-10 text-rose-500" />
        ) : (
          <IoHeartOutline className="w-10 h-10 text-rose-500" />
        )}
      </button>
    </div>
  );
};

export default CollectionButton;
