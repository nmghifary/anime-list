"use client";

interface IOption {
  value: string;
  label: string;
}

const DropdownFilter = ({
  options,
  handleOptionClick,
  sortDatas,
}: {
  options: IOption[];
  handleOptionClick: (value: string) => void;
  sortDatas: string;
}) => {
  return (
    <section className="flex items-center w-full gap-2">
      {options.map((option: IOption) => (
        <button
          key={option.value}
          onClick={() => handleOptionClick(option.value)}
          className={`w-full p-1 rounded font-semibold justify-center items-center bg-opacity-60
            ${
              sortDatas === option.value
                ? "bg-slate-400 text-slate-900"
                : "bg-slate-700 text-slate-200"
            }`}
        >
          {option.label}
        </button>
      ))}
    </section>
  );
};

export default DropdownFilter;
