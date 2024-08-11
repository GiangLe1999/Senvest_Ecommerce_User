"use client";

import { Product } from "@/entities/product.entity";
import { useLocale } from "next-intl";
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
import { Button } from "./ui/button";

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

  return (
    <article
      onMouseEnter={() => setShowAddToCartBtn(true)}
      onMouseLeave={() => setShowAddToCartBtn(false)}
      className="overflow-hidden"
    >
      <Link
        href={"/"}
        className="block w-full aspect-square relative bg-white rounded-sm"
      >
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

        <div
          className={cn(
            btnClassname,
            showAddToCartBtn ? "translate-x-0" : "translate-x-12",
            "product-card-btn-1"
          )}
        >
          <ShoppingCartIcon className="w-3 h-3" />
        </div>

        <div
          className={cn(
            btnClassname,
            "top-12",
            showAddToCartBtn ? "translate-x-0" : "translate-x-12",
            "product-card-btn-2"
          )}
        >
          <SquareArrowOutUpRightIcon className="w-3 h-3" />
        </div>

        <div
          className={cn(
            btnClassname,
            "top-[84px]",
            showAddToCartBtn ? "translate-x-0" : "translate-x-12",
            "product-card-btn-3"
          )}
        >
          <ChartColumnDecreasingIcon className="w-3 h-3" />
        </div>

        <div
          className={cn(
            btnClassname,
            "top-[120px]",
            showAddToCartBtn ? "translate-x-0" : "translate-x-12",
            "product-card-btn-4"
          )}
        >
          <HeartIcon className="w-3 h-3" />
        </div>
      </Link>

      <div className="mt-5 mb-3">
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant, index) => (
            <button
              key={variant.fragrance}
              onClick={() => setActiveVariantIndex(index)}
              className={cn(
                "px-3 py-1 rounded-sm text-xs",
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

      <h4 className="mb-1 text-lg line-clamp-1">
        <Link href={"/"} className="hover:text-primary transition-colors">
          {isVi ? product.name.vi : product.name.en}
        </Link>
      </h4>

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
          <ShoppingBagIcon className="w-4 h-4 mr-1" /> Thêm vào giỏ hàng
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
