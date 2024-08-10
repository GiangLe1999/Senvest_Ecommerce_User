"use client";

import { Product } from "@/entities/product.entity";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC, useState } from "react";
import { Rating } from "./rating";
import { cn, formatCurrencyVND } from "@/lib/utils";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }): JSX.Element => {
  const locale = useLocale();
  const isVi = locale === "vi";
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const activeVariant = product.variants[activeVariantIndex];

  return (
    <article>
      <div className="w-full aspect-square relative bg-white rounded-sm">
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
      </div>
      <h4 className="mt-4 mb-2 text-lg line-clamp-1">
        {isVi ? product.name.vi : product.name.en}
      </h4>

      <Rating value={Number(product.rating)} readonly />

      <div className="mt-2">
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

      <div className="flex flex-wrap gap-2 mt-3">
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
    </article>
  );
};

export default ProductCard;
