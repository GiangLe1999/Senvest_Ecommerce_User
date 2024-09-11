"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/configs/i18n-navigation";
import useMountAnimation from "@/hooks/useMountAnimation";
import { getCategoriesForNavigation } from "@/queries/categories.queries";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  showShopCollectionItems: boolean;
  setShowShopCollectionItems: Dispatch<SetStateAction<boolean>>;
}

const scents = ["Woody", "Lavender", "Floral", "Citrus", "Fresh"];

const ShopCollectionItems: FC<Props> = ({
  showShopCollectionItems,
  setShowShopCollectionItems,
}): JSX.Element => {
  const { isPending, data } = useQuery({
    queryKey: ["categories-for-navigation"],
    queryFn: getCategoriesForNavigation,
  });

  const t = useTranslations("navigation");
  const locale = useLocale();
  const isVi = locale === "vi";

  const { visible, handleAnimationEnd } = useMountAnimation({
    show: showShopCollectionItems,
  });

  const moveToScentPage = (scent: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
      isVi ? "bo-suu-tap" : "collections"
    }/${isVi ? "tat-ca" : "all"}?scent=${scent}`;
    window.location.href = url;
  };

  return (
    <nav
      className={`bg-white border shadow-md p-5 absolute top-full left-0 w-full grid grid-cols-4 gap-4 rounded-sm transition-opacity ${
        showShopCollectionItems
          ? "opacity-100 animate-fade-in"
          : "opacity-0 animate-fade-out"
      } ${visible ? "block" : "hidden"}`}
      onMouseEnter={() => setShowShopCollectionItems(true)}
      onMouseLeave={() => setShowShopCollectionItems(false)}
      onAnimationEnd={handleAnimationEnd}
    >
      <div>
        <p className="font-bold">{t("featured")}</p>
        <ul className="text-muted text-[13px] space-y-1 mt-2">
          <li className="py-1 my-1 hover:text-primary transition-colors">
            <Link href="/bo-suu-tap/san-pham-moi">{t("new_arrivals")}</Link>
          </li>
          <li className="py-1 my-1 hover:text-primary transition-colors">
            <Link href="/bo-suu-tap/ban-chay">{t("best_sellers")}</Link>
          </li>
          <li className="py-1 my-1 hover:text-primary transition-colors">
            <Link href="/bo-suu-tap/khuyen-mai">{t("the_sale_room")}</Link>
          </li>
        </ul>
      </div>

      <div>
        <p className="font-bold">{t("categories")}</p>

        {isPending ? (
          <div className="space-y-3 mt-2">
            {Array.from(Array(3).keys()).map((key) => (
              <Skeleton className="h-6 w-full" key={key} />
            ))}
          </div>
        ) : (
          <ul className="text-muted text-[13px] mt-2">
            {data?.categories?.map((category) => (
              <li
                key={category._id}
                className="py-1 my-1 hover:text-primary transition-colors capitalize"
              >
                <Link
                  href={
                    `/danh-muc/${
                      locale === "en" ? category.slug.en : category.slug.vi
                    }` as any
                  }
                >
                  {locale === "en" ? category.name.en : category.name.vi}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="font-bold">{t("shop_by_scent")}</p>
        <ul className="text-muted text-[13px] mt-2">
          {scents.map((scent) => (
            <li
              className="py-1 my-1 hover:text-primary transition-colors capitalize cursor-pointer"
              key={scent}
              onClick={() => moveToScentPage(scent)}
            >
              {scent}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Image
          className="rounded-sm w-full aspect-square"
          width={163}
          height={163}
          src="/layout/nav-menu-img.jpg"
          alt="Kindle candle categories"
        />
      </div>
    </nav>
  );
};

export default ShopCollectionItems;
