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
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  session: Session | null;
}

const iconClassname = "w-9 h-9 group-hover:text-primary transition-colors";

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
      <h1 className="text-2xl text-center text-primary font-bold my-8">
        {t("heading")}, {session && session.user.name}
      </h1>

      <div className="grid grid-cols-3 gap-[30px]">
        {itemList.map((item, index) => (
          <div
            key={index}
            className="w-full border rounded-sm shadow-md p-6 flex flex-col justify-center gap-3 items-center cursor-pointer group hover:shadow-lg transition-shadow"
          >
            {item.icon}
            <Link
              className="uppercase font-bold group-hover:text-primary transition-colors"
              href={item.link as any}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </SmallSectionContainer>
  );
};

export default AccountPageItems;
