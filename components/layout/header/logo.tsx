import { Link } from "@/configs/i18n-navigation";
import Image from "next/image";
import { FC } from "react";

interface Props {}

const Logo: FC<Props> = (props): JSX.Element => {
  return (
    <Link href="/" className="flex items-center h-full">
      <Image
        src="/logo.svg"
        alt="Kindle Hope Candles Logo"
        width={75}
        height={56.25}
        priority
        className="xl:mx-0 mx-auto"
      />
    </Link>
  );
};

export default Logo;
