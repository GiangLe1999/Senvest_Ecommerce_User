"use client";

import { Product } from "@/entities/product.entity";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useState } from "react";
import { cn, formatCurrencyVND } from "@/lib/utils";
import { Link } from "@/configs/i18n-navigation";
import {
  ChartColumnDecreasingIcon,
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SalesBadge from "./sales-badge";

interface Props {
  product: Product;
}

const btnClassname =
  "absolute top-3 right-3 w-8 h-8 bg-[#ffece4] hover:bg-primary hover:text-white grid place-items-center rounded-sm border border-white";

const ProductCard: FC<Props> = ({ product }): JSX.Element => {
  const locale = useLocale();
  const isVi = locale === "vi";
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const activeVariant = product.variants[activeVariantIndex];
  const [showAddToCartBtn, setShowAddToCartBtn] = useState(false);
  const t = useTranslations("product_card");

  return (
    <article
      onMouseEnter={() => setShowAddToCartBtn(true)}
      onMouseLeave={() => setShowAddToCartBtn(false)}
    >
      <Link href={"/"} className="block relative bg-white rounded-sm">
        {/* Product images */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={activeVariant.images[0]}
            alt={
              isVi
                ? `${product.name.vi} ${activeVariant.fragrance}`
                : `${product.name.en} ${activeVariant.fragrance}`
            }
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            className="rounded-sm"
          />

          {/* Action buttons */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  btnClassname,
                  showAddToCartBtn ? "translate-x-0" : "translate-x-12",
                  "product-card-btn-1"
                )}
              >
                <ShoppingCartIcon className="w-3 h-3" />
              </TooltipTrigger>
              <TooltipContent align="start" side="left" className="bg-black">
                <p>{t("add_to_cart")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  btnClassname,
                  "top-12",
                  showAddToCartBtn ? "translate-x-0" : "translate-x-12",
                  "product-card-btn-2"
                )}
              >
                <SquareArrowOutUpRightIcon className="w-3 h-3" />
              </TooltipTrigger>
              <TooltipContent align="start" side="left" className="bg-black">
                <p>{t("quick_view")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  btnClassname,
                  "top-[84px]",
                  showAddToCartBtn ? "translate-x-0" : "translate-x-12",
                  "product-card-btn-3"
                )}
              >
                <ChartColumnDecreasingIcon className="w-3 h-3" />
              </TooltipTrigger>
              <TooltipContent align="start" side="left" className="bg-black">
                <p>{t("compare")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  btnClassname,
                  "top-[120px]",
                  showAddToCartBtn ? "translate-x-0" : "translate-x-12",
                  "product-card-btn-4"
                )}
              >
                <HeartIcon className="w-3 h-3" />
              </TooltipTrigger>
              <TooltipContent align="start" side="left" className="bg-black">
                <p>{t("add_to_wishlist")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Sales badge */}
        {activeVariant.discountedPrice && (
          <SalesBadge activeVariant={activeVariant} t={t} />
        )}
      </Link>

      {/* Pruduct variants */}
      <div className="mt-5 mb-4">
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant, index) => (
            <button
              key={variant.fragrance}
              onClick={() => setActiveVariantIndex(index)}
              className={cn(
                "px-2 py-1 rounded-md text-[10px] shadow-md",
                activeVariantIndex === index
                  ? "bg-primary text-white"
                  : "bg-white text-muted"
              )}
            >
              {variant.fragrance}
            </button>
          ))}
        </div>
      </div>

      {/* Product name */}
      <h4 className="mb-2 text-lg line-clamp-1">
        <Link href={"/"} className="hover:text-primary transition-colors">
          {isVi ? product.name.vi : product.name.en}
        </Link>
      </h4>

      {/* Product price */}
      <div className="relative">
        <span
          className={cn(
            "text-sm transition-all duration-500 absolute z-10 inset-0 flex justify-start items-center p-0 hover:text-primary hover:underline cursor-pointer",
            showAddToCartBtn
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-6"
          )}
          onClick={() => alert("Add to cart")}
        >
          <ShoppingBagIcon className="w-4 h-4 mr-1" />
          {t("add_to_cart")}
        </span>
        <div
          className={cn(
            "transition-all duration-500",
            showAddToCartBtn
              ? "opacity-0 translate-x-12"
              : "opacity-100 translate-x-0"
          )}
        >
          {activeVariant?.discountedPrice ? (
            <p>
              <span className="mr-4 text-sm text-muted line-through">
                {formatCurrencyVND(activeVariant.price)}
              </span>
              <span className="text-primary font-bold text-xl">
                {formatCurrencyVND(activeVariant.discountedPrice)}
              </span>
            </p>
          ) : (
            <p className="text-primary font-bold text-xl">
              {formatCurrencyVND(activeVariant.price)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
