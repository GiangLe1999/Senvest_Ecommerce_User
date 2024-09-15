"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/configs/i18n-navigation";
import { getCategoriesForNavigation } from "@/queries/categories.queries";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { scents } from "../navigation/shop-collection-items";
import { SheetClose } from "@/components/ui/sheet";

interface Props {}

const MobileShopCollectionItems: FC<Props> = (): JSX.Element => {
  const { isPending, data } = useQuery({
    queryKey: ["categories-for-navigation"],
    queryFn: getCategoriesForNavigation,
  });

  const t = useTranslations("navigation");
  const locale = useLocale();
  const isVi = locale === "vi";

  const moveToScentPage = (scent: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
      isVi ? "bo-suu-tap" : "collections"
    }/${isVi ? "tat-ca" : "all"}?scent=${scent}`;
    window.location.href = url;
  };

  return (
    <nav>
      <div className="mb-4">
        <p className="font-bold">{t("featured")}</p>
        <ul className="text-muted text-[13px] mt-2">
          <li className="py-1 my-1 hover:text-primary transition-colors">
            <Link href="/bo-suu-tap/san-pham-moi">
              <SheetClose>{t("new_arrivals")}</SheetClose>
            </Link>
          </li>
          <li className="py-1 my-1 hover:text-primary transition-colors">
            <Link href="/bo-suu-tap/ban-chay">
              <SheetClose>{t("best_sellers")}</SheetClose>
            </Link>
          </li>
          <li className="py-1 my-1 hover:text-primary transition-colors">
            <Link href="/bo-suu-tap/khuyen-mai">
              <SheetClose>{t("the_sale_room")}</SheetClose>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
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
                  <SheetClose>
                    {locale === "en" ? category.name.en : category.name.vi}
                  </SheetClose>
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
              <SheetClose>{scent}</SheetClose>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MobileShopCollectionItems;
