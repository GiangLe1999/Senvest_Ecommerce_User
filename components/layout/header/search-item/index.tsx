import { HeartIcon, SearchIcon } from "lucide-react";
import { FC } from "react";

interface Props {}

const SearchItem: FC<Props> = (props): JSX.Element => {
  return (
    <div className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
      <SearchIcon className="w-5 h-5" />
    </div>
  );
};

export default SearchItem;
