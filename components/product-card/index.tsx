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
import ActionButtons from "./action-buttons";
import PriceOrAddToCart from "./price-or-add-to-cart";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }): JSX.Element => {
  const t = useTranslations("product_card");
  const locale = useLocale();
  const isVi = locale === "vi";
  const router = useRouter();

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const activeVariant = product.variants[activeVariantIndex];

  const [showAddToCartBtn, setShowAddToCartBtn] = useState(false);

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
          <ActionButtons
            t={t}
            showAddToCartBtn={showAddToCartBtn}
            addToCartHandler={addToCartHandler}
            product={product}
            isVi={isVi}
            activeVariantIndex={activeVariantIndex}
            setActiveVariantIndex={setActiveVariantIndex}
            activeVariant={activeVariant}
          />
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
      <PriceOrAddToCart
        product={product}
        activeVariant={activeVariant}
        t={t}
        showAddToCartBtn={showAddToCartBtn}
        addToCartHandler={addToCartHandler}
      />
    </article>
  );
};

export default ProductCard;
