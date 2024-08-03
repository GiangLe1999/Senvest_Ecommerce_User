import { Link } from "@/configs/i18n-navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import ShopCollectionItems from "./shop-collection-items";

interface Props {}

const navItemClassname =
  "h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm";

const Navigation: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("navigation");

  return (
    <nav className="h-full relative">
      <ul className="flex h-full justify-center">
        <li className="h-full">
          <Link
            href="/bo-suu-tap/tat-ca"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("shop")}
            <ChevronDown className="ml-2 w-3.5 h-3.5" />
          </Link>
        </li>

        <li className="h-full">
          <Link
            href="/bo-suu-tap/san-pham-moi"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("new")}
          </Link>
        </li>

        <li className="h-full">
          <Link
            href="/bo-suu-tap/ban-chay"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("best_sellers")}
          </Link>
        </li>

        <li className="h-full">
          <Link
            href="/bo-suu-tap/khuyen-mai"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("sale")}
          </Link>
        </li>

        <li className="h-full">
          <Link
            href="/ve-chung-toi"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("about")}
          </Link>
        </li>

        <li className="h-full">
          <Link
            href="/su-menh"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("mission")}
            <ChevronDown className="ml-2 w-3.5 h-3.5" />
          </Link>
        </li>

        <li className="h-full">
          <Link
            href="/blog"
            className="h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm"
          >
            {t("blogs")}
          </Link>
        </li>
      </ul>

      <ShopCollectionItems />
    </nav>
  );
};

export default Navigation;
