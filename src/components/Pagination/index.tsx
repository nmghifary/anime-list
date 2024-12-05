import { Dispatch } from "react";

interface IPagination {
  currentPage: number;
  lastPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ currentPage, lastPage, setCurrentPage }: IPagination) => {
  const scrollTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePrevButton = () => {
    setCurrentPage((prevState: number) => prevState - 1);
    scrollTop();
  };

  const handleNextButton = () => {
    setCurrentPage((prevState: number) => prevState + 1);
    scrollTop();
  };
  return (
    <div className="flex justify-end items-center gap-4 mx-4 my-2 text-white">
      <button
        onClick={handlePrevButton}
        disabled={currentPage === 1}
        className="px-1 pl-2 bg-cyan-700 rounded-s-xl hover:bg-cyan-500"
      >
        Prev
      </button>
      <p className="">{`${currentPage} of ${lastPage}`}</p>
      <button
        onClick={handleNextButton}
        disabled={currentPage === lastPage}
        className="px-1 pr-2 bg-cyan-700 rounded-e-xl hover:bg-cyan-500"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
