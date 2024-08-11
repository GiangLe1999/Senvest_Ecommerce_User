"use client";

import { Product } from "@/entities/product.entity";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@/configs/i18n-navigation";
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
import QuickView from "./quick-view";
import Price from "./price";
import Variants from "./variants";
import { useCartStore } from "@/stores/useCartStore";
import CustomFlyingButton from "../custom-flying-button";

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
  const [openQuickView, setOpenQuickView] = useState(false);
  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);
  const addToCartHandler = () => {
    addToCart({
      _id: product._id,
      variant_id: activeVariant._id,
      quantity: 1,
      price: activeVariant?.discountedPrice
        ? activeVariant.discountedPrice
        : activeVariant.price,
      image: activeVariant.images[0],
      name: product.name,
      scent: activeVariant.fragrance,
      stock: activeVariant.stock,
    });
  };

  return (
    <article
      onMouseEnter={() => setShowAddToCartBtn(true)}
      onMouseLeave={() => setShowAddToCartBtn(false)}
    >
      <div
        onClick={() => router.push("/")}
        className="block relative bg-white rounded-sm cursor-pointer"
      >
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
                onClick={(e) => {
                  e.stopPropagation();
                  addToCartHandler();
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenQuickView(true);
                }}
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
      </div>

      {/* Pruduct variants */}
      <div className="mt-5 mb-4">
        <Variants
          product={product}
          activeVariantIndex={activeVariantIndex}
          setActiveVariantIndex={setActiveVariantIndex}
        />
      </div>

      {/* Product name */}
      <h4 className="mb-2 text-lg line-clamp-1">
        <Link href={"/"} className="hover:text-primary transition-colors">
          {isVi ? product.name.vi : product.name.en}
        </Link>
      </h4>

      {/* Product price */}
      <CustomFlyingButton src={activeVariant.images[0]}>
        <div className="relative w-[150px]">
          <div
            className={cn(
              "text-sm !leading-7 transition-all duration-500 absolute z-10 inset-0 p-0 cursor-pointer h-[28px] hover:text-primary hover:underline text-muted text-left",
              showAddToCartBtn
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            )}
            onClick={addToCartHandler}
          >
            + {t("add_to_cart")}
          </div>
          <div
            className={cn(
              "transition-all duration-500",
              showAddToCartBtn
                ? "opacity-0 translate-x-12"
                : "opacity-100 translate-x-0"
            )}
          >
            <Price activeVariant={activeVariant} />
          </div>
        </div>
      </CustomFlyingButton>

      <QuickView
        open={openQuickView}
        setOpen={setOpenQuickView}
        product={product}
        activeVariant={activeVariant}
        isVi={isVi}
        activeVariantIndex={activeVariantIndex}
        setActiveVariantIndex={setActiveVariantIndex}
      />
    </article>
  );
};

export default ProductCard;
