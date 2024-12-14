interface IPagination {
  currentPage: number;
  lastPage: number;
  handleOnClick: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, handleOnClick }: IPagination) => {
  return (
    <div className="flex justify-end items-center mx-4 my-2 text-white">
      <button
        onClick={() => handleOnClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 rounded-s-xl border-cyan-700 hover:border-cyan-500 border-2 border-r-0 hover:bg-slate-700"
      >
        Prev
      </button>
      <p className="border-y-2 border-cyan-700 px-2">{`${currentPage} of ${lastPage}`}</p>
      <button
        onClick={() => handleOnClick(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-2 rounded-e-xl border-cyan-700 hover:border-cyan-500 border-2 border-l-0 hover:bg-slate-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
