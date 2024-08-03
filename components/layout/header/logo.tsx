import { Link } from "@/configs/i18n-navigation";
import Image from "next/image";
import { FC } from "react";

interface Props {}

const Logo: FC<Props> = (props): JSX.Element => {
  return (
    <Link href="/" className="flex items-center h-full">
      <Image
        src="/logo.png"
        alt="Kindle Hope Candles Logo"
        width={110}
        height={82.5}
        priority
      />
    </Link>
  );
};

export default Logo;