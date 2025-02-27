"use client";

import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { FaRegBookmark, FaRegTrashCan } from "react-icons/fa6";
import dynamic from "next/dynamic";

type PropsButtonUser = {
  email: string | null | undefined;
  user_email: string;
  comment_id: string;
  refresh?: (() => void) | null;
};

const Modal = dynamic(() => import("../Modal"), {
  ssr: false,
  // loading: () => <p>Loading modal...</p>, // Optional: Loading fallback
});

const ButtonUser = ({
  email,
  user_email,
  comment_id,
  refresh,
}: PropsButtonUser) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isTransitionModal, setIsTransitionModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
    setTimeout(() => {
      setIsTransitionModal(true);
    }, 10);
  };
  const handleCloseModal = () => {
    setIsTransitionModal(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 500);
  };
  const handleDeleteComment = async () => {
    const response = await fetch("/api/v1/comment", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: comment_id }),
    });
    const comment = await response.json();
    if (comment.status === 200) {
      handleCloseModal();
      refresh?.();
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="w-8 text-xl">
        <IoMdMore />
      </button>
      {isOpenModal && (
        <Modal handleHideModal={handleCloseModal} isOpen={isTransitionModal}>
          <div className="flex flex-col">
            <div className="bg-slate-500 rounded-full w-36 h-2 self-center my-1" />
            <div className="text-slate-400 text-lg font-bold border-b-2 border-slate-500 mx-2">
              Comment
            </div>
            <div className="flex flex-col">
              {email === user_email && (
                <button
                  onClick={handleDeleteComment}
                  className="flex text-xl text-slate-100 gap-4 items-center hover:bg-slate-600 p-2"
                >
                  <FaRegTrashCan />
                  <h3>Delete</h3>
                </button>
              )}
              <div className="flex text-xl text-slate-100 gap-4 items-center hover:bg-slate-600 p-2">
                <FaRegBookmark />
                <h3>Save</h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ButtonUser;
