"use client";

import useFromStore from "@/hooks/useFromStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { FC } from "react";
import NoComparisonItems from "./no-comparison-items";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import parse from "html-react-parser";
import Price from "@/components/product-card/price";
import SalesBadge from "@/components/product-card/sales-badge";
import { getPriceForVariant, isDiscounted } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { CompareProduct } from "@/entities/compare-product.entity";
import { Rating } from "@/components/rating";

interface Props {}

const ComparisonTable: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("comparison_page");
  const cartState = useFromStore(useCartStore, (state) => state);
  const compareState = useFromStore(useCompareStore, (state) => state);
  const isVi = useLocale() === "vi";

  const addToCartHandler = (item: CompareProduct, activeVariant: any) => {
    cartState &&
      cartState.addToCart({
        _id: item._id,
        variant_id: item.variant_id,
        quantity: 1,
        price: getPriceForVariant(activeVariant),
        image: item.image,
        name: item.name,
        scent: item.scent,
        stock: item.stock,
        slug: item.slug,
        locale: isVi ? "vi" : "en",
      });
  };

  return (
    <>
      {compareState?.items?.length === 0 ? (
        <NoComparisonItems />
      ) : (
        <div className="overflow-x-scroll" style={{ scrollbarWidth: "thin" }}>
          <table>
            <tbody>
              <tr>
                <th className="border w-[130px] min-w-[130px]">Details</th>
                {compareState?.items?.map((item) => {
                  const activeVariantPrice: any = {
                    price: item.price,
                    discountedPrice: item.discountedPrice,
                    discountedFrom: item.discountedFrom,
                    discountedTo: item.discountedTo,
                  };

                  return (
                    <td
                      className="border min-w-[300px] w-[300px]"
                      key={item._id}
                    >
                      <div className="w-full aspect-square border-b relative">
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger
                              onClick={() => {
                                compareState?.removeFromCompare({
                                  _id: item._id,
                                  variant_id: item.variant_id,
                                });
                              }}
                              className="!w-5 !h-5 rounded-full bg-red-600 text-white hover:bg-red-500 absolute right-4 top-3 z-[1] text-xs transition"
                            >
                              X
                            </TooltipTrigger>
                            <TooltipContent align="center" className="bg-black">
                              <p>{t("remove")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <Image
                          src={item.image}
                          alt={
                            isVi
                              ? item.name.vi + " " + item.scent
                              : item.name.en + " " + item.scent
                          }
                          fill
                          sizes="100vw"
                          style={{ objectFit: "cover" }}
                        />
                        {isDiscounted(activeVariantPrice) && (
                          <SalesBadge activeVariant={activeVariantPrice} />
                        )}
                      </div>

                      <div className="p-4">
                        <h2 className="text-lg mb-1">
                          {isVi ? item.name.vi : item.name.en}
                        </h2>
                        <p className="text-sm text-muted line-clamp-2 min-h-[40px] mb-1">
                          {parse(
                            isVi ? item.description.vi : item.description.en
                          )}
                        </p>
                        <Price activeVariant={activeVariantPrice} />

                        <Button
                          className="mt-4 w-full"
                          onClick={() =>
                            addToCartHandler(item, activeVariantPrice)
                          }
                        >
                          <ShoppingCartIcon className="mr-2 w-3 h-3" />{" "}
                          {t("add_to_cart")}
                        </Button>
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th className="border w-[130px] min-w-[130px]">Scent</th>
                {compareState?.items?.map((item) => {
                  return (
                    <td
                      className="border min-w-[300px] w-[300px]"
                      key={item._id}
                    >
                      <p className="p-4 text-center">{item.scent}</p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th className="border w-[130px] min-w-[130px]">Stock</th>
                {compareState?.items?.map((item) => {
                  return (
                    <td
                      className="border min-w-[300px] w-[300px]"
                      key={item._id}
                    >
                      <p className="p-4 text-center">{item.stock} products</p>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th className="border w-[130px] min-w-[130px]">Rating</th>
                {compareState?.items?.map((item) => {
                  return (
                    <td
                      className="border min-w-[300px] w-[300px] p-4"
                      key={item._id}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Rating value={parseFloat(item.rating)} readonly />(
                        {parseFloat(item.rating).toFixed(1)})
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ComparisonTable;
