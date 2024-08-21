import { Link } from "@/configs/i18n-navigation";
import { HeartIcon } from "lucide-react";
import { FC } from "react";

interface Props {}

const WishlistItem: FC<Props> = (props): JSX.Element => {
  return (
    <div className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
      <Link href="/tai-khoan/san-pham-yeu-thich" className="relative">
        <HeartIcon className="w-5 h-5" />
        <div className="bg-primary w-4 h-4 grid place-items-center leading-none text-[10px] rounded-full text-white absolute -top-2 -right-[6px]">
          3
        </div>
      </Link>
    </div>
  );
};

export default WishlistItem;
