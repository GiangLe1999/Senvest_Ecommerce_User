import { FC } from "react";

interface Props {
  content: string;
  onClick: () => void;
}

const FilterTag: FC<Props> = ({ content, onClick }): JSX.Element => {
  return (
    <div className="bg-secondary rounded-sm h-6 flex items-center pl-2">
      <span className="max-w-[150px] line-clamp-1">{content}</span>
      <button
        onClick={onClick}
        className="h-full aspect-square grid place-items-center ml-2 bg-muted/40 rounded-r-sm text-white text-[10px] hover:bg-red-600 transition"
      >
        X
      </button>
    </div>
  );
};

export default FilterTag;
