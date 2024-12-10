interface IPagination {
  currentPage: number;
  lastPage: number;
  handleOnClick: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, handleOnClick }: IPagination) => {
  return (
    <div className="flex justify-end items-center gap-4 mx-4 my-2 text-white">
      <button
        onClick={() => handleOnClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-1 pl-2 bg-cyan-700 rounded-s-xl hover:bg-cyan-500"
      >
        Prev
      </button>
      <p className="">{`${currentPage} of ${lastPage}`}</p>
      <button
        onClick={() => handleOnClick(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-1 pr-2 bg-cyan-700 rounded-e-xl hover:bg-cyan-500"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
