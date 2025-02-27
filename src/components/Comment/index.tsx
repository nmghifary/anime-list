"use client";

import { BiSlider } from "react-icons/bi";
import CommentSubmit from "./CommentSubmit";
import { useEffect, useState } from "react";
import CommentBox, { ICommentBox } from "./CommentBox";
import DropdownFilter from "./DropdownFilter";
import { IoClose } from "react-icons/io5";

interface IComment {
  user_email: string | null | undefined;
  username: string | null | undefined;
  user_image: string | null | undefined;
  anime_mal_id: string;
  anime_image: string;
}

const Comment = ({
  user_email,
  username,
  user_image,
  anime_mal_id,
  anime_image,
}: IComment) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshFetch, setRefreshFetch] = useState(false);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState<string[]>([]);
  const options = [
    { value: "LATEST", label: "Latest" },
    { value: "POPULAR", label: "Popular" },
    { value: "OLDEST", label: "Oldest" },
  ];
  const [sortDatas, setSortDatas] = useState(options[0].value);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/v1/comment?anime_mal_id=${encodeURIComponent(
          anime_mal_id
        )}&sortDatas=${encodeURIComponent(sortDatas)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const getComment = await response.json();
      if (getComment.status == "200") {
        setComments(getComment.data);
      }
    };
    fetchData();
  }, [anime_mal_id, sortDatas, refreshFetch]);

  const handleRefresh = () => {
    setRefreshFetch((prev) => !prev);
    setReplies([]);
  };
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleOptionClick = (value: string) => {
    setSortDatas(value);
    setIsOpen(false);
    handleRefresh();
  };
  const handleRepliesComment = (
    comment_id: string,
    comment_username: string
  ) => {
    setReplies([comment_id, comment_username]);
  };
  const resetRepliesComment = () => {
    setReplies([]);
  };

  return (
    <div className="flex flex-col w-full rounded-t-xl py-0 bg-slate-800 items-center justify-center">
      <div className="flex justify-between items-center w-full border-b-2 border-slate-600 p-4 py-2">
        <div className="flex gap-2 items-center">
          <h3 className="font-bold text-xl text-slate-200">Comments</h3>
          {comments.length != 0 ? (
            <span className="text-slate-400">{comments.length}</span>
          ) : null}
        </div>
        <button
          onClick={toggleDropdown}
          className="flex gap-4 text-2xl hover:text-slate-400"
        >
          <BiSlider />
        </button>
      </div>
      {replies[0] && (
        <div className="flex w-full">
          <div className="flex border-b-2 border-slate-700 w-[10%]"></div>

          <div className="flex items-center rounded-t-xl transition-all">
            <button
              onClick={resetRepliesComment}
              className="peer text-red-600 text-xl hover:bg-slate-600 border-2 border-b-0 border-r-0 border-slate-700 px-2 rounded-tl-xl h-7"
            >
              <IoClose />
            </button>
            <h3 className="text-slate-200 peer-hover:text-red-500 border-2 border-b-0 border-l-0 border-slate-700 px-2 h-7 rounded-tr-xl">
              Replying to @<span className="font-semibold">{replies[1]}</span>
            </h3>
          </div>
          <div className="flex flex-grow border-b-2 border-slate-700"></div>
        </div>
      )}
      <CommentSubmit
        anime_mal_id={anime_mal_id}
        anime_image={anime_image}
        user_email={user_email}
        user_image={user_image}
        username={username}
        parent_id={replies[0]}
        refresh={handleRefresh}
      />
      {isOpen && (
        <div className="relative w-full">
          <div className="absolute p-2 w-full top-0.5 bg-white bg-opacity-20 backdrop-blur-lg transition-all duration-500 ease-in-out shadow-md z-20">
            <DropdownFilter
              options={options}
              handleOptionClick={handleOptionClick}
              sortDatas={sortDatas}
            />
          </div>
          <div
            onClick={toggleDropdown}
            className="fixed w-full h-full z-10 cursor-pointer"
          />
        </div>
      )}
      {comments.length === 0 ? (
        <div className="flex text-2xl font-bold text-slate-500 justify-center items-center w-full h-24 shadow">
          No comments yet
        </div>
      ) : (
        <div className="p-4 py-2 w-full">
          {comments
            .filter((c: ICommentBox) => !c.parent_id)
            .map((comment: ICommentBox) => {
              return (
                <CommentBox
                  key={comment.id}
                  comment={comment}
                  user_email={user_email}
                  handleRepliesComment={handleRepliesComment}
                  childComments={comments}
                  refresh={handleRefresh}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Comment;
