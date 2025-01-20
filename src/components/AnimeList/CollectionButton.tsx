"use client";

import { supabase } from "@/libs/supabaseClient";
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
    const fetchData = async () => {
      const { data } = await supabase
        .from("collection")
        .select()
        .eq("anime_mal_id", anime_mal_id)
        .eq("user_email", user_email);

      if (data?.length == 0) {
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [anime_mal_id, user_email]);

  const handleClickCollection = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // Jika tidak ada di db
    if (!isLiked) {
      const { error } = await supabase
        .from("collection")
        .insert([{ user_email, anime_mal_id, anime_title, anime_image }]);

      if (error) {
        alert(error.message);
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
      // Jika ada di db
    } else {
      const response = await supabase
        .from("collection")
        .delete()
        .eq("anime_mal_id", anime_mal_id)
        .eq("user_email", user_email);

      if (response.status == 204) {
        setIsLiked(false);
      }
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
