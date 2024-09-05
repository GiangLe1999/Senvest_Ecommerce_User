"use client";

import { Link } from "@/configs/i18n-navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import ShopCollectionItems from "./shop-collection-items";
import MissionItems from "./mission-items";

interface Props {}

const navItemClassname =
  "h-full flex items-center hover:text-primary transition-colors px-5 uppercase font-bold text-sm";

const Navigation: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("navigation");
  const [showShopCollectionItems, setShowShopCollectionItems] = useState(false);

  return (
    <nav className="h-full relative">
      <ul className="flex h-full justify-center">
        <li
          className="h-full"
          onMouseEnter={() => setShowShopCollectionItems(true)}
          onMouseLeave={() => setShowShopCollectionItems(false)}
        >
          <Link href="/bo-suu-tap/tat-ca" className={navItemClassname}>
            {t("shop")}
            <ChevronDown className="ml-2 w-3.5 h-3.5" />
          </Link>
        </li>

        <li className="h-full">
          <Link href="/bo-suu-tap/san-pham-moi" className={navItemClassname}>
            {t("new")}
          </Link>
        </li>

        <li className="h-full">
          <Link href="/bo-suu-tap/ban-chay" className={navItemClassname}>
            {t("best_sellers")}
          </Link>
        </li>

        <li className="h-full">
          <Link href="/bo-suu-tap/khuyen-mai" className={navItemClassname}>
            {t("sale")}
          </Link>
        </li>

        <li className="h-full">
          <Link href="/ve-chung-toi" className={navItemClassname}>
            {t("about")}
          </Link>
        </li>

        <li className="h-full">
          <MissionItems />
        </li>

        <li className="h-full">
          <Link
            href={"http://blog.kindlehopecandles.com" as any}
            className={navItemClassname}
          >
            {t("blogs")}
          </Link>
        </li>
      </ul>

      <ShopCollectionItems
        showShopCollectionItems={showShopCollectionItems}
        setShowShopCollectionItems={setShowShopCollectionItems}
      />
    </nav>
  );
};

export default Navigation;
