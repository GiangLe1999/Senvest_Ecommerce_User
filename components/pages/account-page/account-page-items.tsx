"use client";

import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import {
  CircleUserIcon,
  FileCode2Icon,
  HeartIcon,
  MapPinIcon,
  ReceiptTextIcon,
  SquareUserIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  session: Session | null;
}

const iconClassname = "w-9 h-9";

const AccountPageItems: FC<Props> = ({ session }): JSX.Element => {
  const t = useTranslations("account_page");

  const itemList = [
    {
      name: t("profile"),
      link: "/tai-khoan/thong-tin",
      icon: <CircleUserIcon className={iconClassname} />,
    },
    {
      name: t("addresses"),
      link: "/tai-khoan/dia-chi",
      icon: <MapPinIcon className={iconClassname} />,
    },
    {
      name: t("order_history"),
      link: "/tai-khoan/lich-su-mua-hang",
      icon: <FileCode2Icon className={iconClassname} />,
    },
    {
      name: t("credit_slip"),
      link: "/tai-khoan/hoa-don-tra-hang",
      icon: <ReceiptTextIcon className={iconClassname} />,
    },
    {
      name: t("gdpr"),
      link: "/tai-khoan/gdpr",
      icon: <SquareUserIcon className={iconClassname} />,
    },
    {
      name: t("wishlist"),
      link: "/tai-khoan/wishlist",
      icon: <HeartIcon className={iconClassname} />,
    },
  ];

  return (
    <SmallSectionContainer>
      <h1 className="text-xl text-muted text-center my-8">
        {t("heading")},{" "}
        <strong className="text-primary">{session && session.user.name}</strong>
      </h1>

      <div className="grid grid-cols-3 gap-[30px]">
        {itemList.map((item, index) => (
          <Link
            key={index}
            className="rounded-sm text-muted shadow p-6 flex flex-col justify-center gap-3 items-center cursor-pointer group transition-all hover:text-white hover:border-primary hover:bg-primary"
            href={item.link as any}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => signOut()}
          className="mx-auto underline text-lg my-10 hover:text-primary transition-colors"
        >
          {t("sign_out")}
        </button>
      </div>
    </SmallSectionContainer>
  );
};

export default AccountPageItems;
