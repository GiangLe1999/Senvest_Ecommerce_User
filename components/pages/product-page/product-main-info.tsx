import Price from "@/components/product-card/price";
import { Rating } from "@/components/rating";
import { Product } from "@/entities/product.entity";
import { Variant } from "@/entities/variant.entity";
import { FC } from "react";
import parse from "html-react-parser";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cn, getPriceForVariant } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChartColumnIncreasingIcon,
  CircleHelpIcon,
  CreditCardIcon,
  HeartIcon,
  Share2,
  ShoppingCartIcon,
} from "lucide-react";
import ChangeProductQuantity from "@/components/change-product-quantity";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "@/configs/i18n-navigation";

interface Props {
  t: any;
  isVi: boolean;
  product: Product;
  activeVariant: Variant;
  activeVariantIndex: number;
  setActiveVariantIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ProductMainInfo: FC<Props> = ({
  t,
  isVi,
  product,
  activeVariant,
  activeVariantIndex,
  setActiveVariantIndex,
}): JSX.Element => {
  const { cart } = useCartStore((state) => state);
  const router = useRouter();

  return (
    <div>
      <div className="space-y-3">
        {/* Name */}
        <h1 className="text-4xl font-bold text-primary capitalize line-clamp-2">
          {isVi ? product.name.vi : product.name.en}
        </h1>

        {/* Reviews */}
        <div className="flex items-center gap-6 text-sm text-muted">
          <Rating value={parseFloat(product.rating)} readonly={true} />
          <button
            type="button"
            className="hover:text-primary transition-colors"
          >
            {t("read_reviews")}(0)
          </button>
          <div className="h-4 bg-border w-[1px]"></div>
          <button
            type="button"
            className="hover:text-primary transition-colors"
          >
            {t("write_a_review")}
          </button>
        </div>
        <Price activeVariant={activeVariant} isDetailPage />
        <div className="line-clamp-3">
          {isVi
            ? parse(product?.description?.vi)
            : parse(product?.description?.en)}
        </div>

        <Separator className="!my-5" />

        {/* Variants */}
        <div>
          <p className="mb-1 font-bold text-sm text-muted">{t("scent")}:</p>
          <div className="flex items-center flex-wrap gap-4">
            {product.variants.map((variant, index) => (
              <button
                key={variant._id}
                onClick={() => setActiveVariantIndex(index)}
                type="button"
                className={cn(
                  "border rounded-sm p-2 flex items-center gap-2 transition text-sm",
                  index === activeVariantIndex
                    ? "border-primary"
                    : "hover:border-primary"
                )}
              >
                <Image
                  width={24}
                  height={24}
                  src={variant.images[0]}
                  alt={
                    isVi
                      ? `${product.name.vi} ${variant.fragrance}`
                      : `${product.name.en} ${variant.fragrance}`
                  }
                  className="rounded-sm"
                />
                <span>{variant.fragrance}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center !my-6 text-sm">
          <button
            type="button"
            className="flex items-center gap-2 pr-6 border-r hover:text-primary transition-colors"
          >
            <HeartIcon className="w-4 h-4" />
            {t("wishlist")}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 border-r hover:text-primary transition-colors"
          >
            <ChartColumnIncreasingIcon className="w-4 h-4" /> {t("compare")}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 border-r hover:text-primary transition-colors"
          >
            <CircleHelpIcon className="w-4 h-4" /> {t("ask_question")}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4" /> {t("share")}
          </button>
        </div>

        {/* Cart Buttons */}
        <div className="flex items-center gap-4">
          <ChangeProductQuantity
            cartItem={
              cart?.find(
                (item) =>
                  item._id === product._id &&
                  item.variant_id === activeVariant._id
              ) || {
                _id: product._id,
                variant_id: activeVariant._id,
                quantity: 1,
                price: getPriceForVariant(activeVariant),
                image: activeVariant.images[0],
                name: product.name,
                scent: activeVariant.fragrance,
                stock: activeVariant.stock,
              }
            }
            isDetailPage
          />
          <Button
            size="lg"
            className="hover:bg-primary"
            onClick={() => router.push("/gio-hang")}
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" /> {t("check_cart")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-white"
            onClick={() => router.push("/thanh-toan")}
          >
            <CreditCardIcon className="w-5 h-5 mr-2" /> {t("buy_now")}
          </Button>
        </div>

        <div className="bg-border !mt-7 !mb-5 w-full h-[0.5px]"></div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-muted">
          <div className="flex items-center gap-4">
            <span className="uppercase">{t("available")}: </span>{" "}
            <span className="font-bold">
              {activeVariant.stock} {t("products")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="uppercase">{t("total_sales")}: </span>{" "}
            <span className="font-bold">
              {product.totalQuantitySold} {t("products")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="uppercase">{t("category")}: </span>{" "}
            <span className="font-bold">
              {isVi ? product.category.name.vi : product.category.name.en}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="uppercase">{t("brand")}: </span>{" "}
            <span className="font-bold">
              {activeVariant.stock} Kindle Hope Candles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
