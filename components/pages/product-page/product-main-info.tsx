import Price from "@/components/product-card/price";
import { Rating } from "@/components/rating";
import { Product } from "@/entities/product.entity";
import { Variant } from "@/entities/variant.entity";
import { FC, useEffect, useState } from "react";
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
import ProductActionBtns from "./product-action-btns";
import { toast } from "sonner";

interface Props {
  t: any;
  isVi: boolean;
  product: Product;
  activeVariant: Variant;
  activeVariantIndex: number;
  setActiveVariantIndex: React.Dispatch<React.SetStateAction<number>>;
  shownContent: "desc" | "reviews";
  setShownContent: React.Dispatch<React.SetStateAction<"desc" | "reviews">>;
}

const ProductMainInfo: FC<Props> = ({
  t,
  isVi,
  product,
  activeVariant,
  activeVariantIndex,
  setActiveVariantIndex,
  shownContent,
  setShownContent,
}): JSX.Element => {
  const { cart } = useCartStore((state) => state);
  const router = useRouter();

  const [scrollToSection, setScrollToSection] = useState<
    null | "reviews" | "add-review"
  >(null);

  const readReviewBtnClickHandler = () => {
    setShownContent("reviews");
    setScrollToSection("reviews");
  };

  const writeReviewBtnClickHandler = () => {
    setShownContent("reviews");
    setScrollToSection("add-review");
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      return toast.error(t("cart_is_empty"), {
        description: t("cart_is_empty_desc"),
      });
    }

    router.push("/thanh-toan");
  };

  useEffect(() => {
    if (scrollToSection) {
      const section = document.getElementById(scrollToSection);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      setScrollToSection(null);
    }
  }, [shownContent, scrollToSection]);

  return (
    <div>
      <div className="space-y-3">
        {/* Name */}
        <h1 className="lg:text-4xl text-3xl font-bold capitalize line-clamp-2">
          {isVi ? product.name.vi : product.name.en}
        </h1>

        {/* Reviews */}
        <div className="flex flex-wrap items-center sm:gap-6 gap-2 text-sm text-muted">
          <Rating value={parseFloat(product.rating)} readonly={true} />
          <div className="h-4 bg-border w-[1px]"></div>
          <button
            type="button"
            className="hover:text-primary transition-colors"
            onClick={readReviewBtnClickHandler}
          >
            {t("read_reviews")} ({product.nums_of_reviews})
          </button>
          <div className="h-4 bg-border w-[1px]"></div>
          <button
            type="button"
            className="hover:text-primary transition-colors"
            onClick={writeReviewBtnClickHandler}
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
        <ProductActionBtns
          t={t}
          product={product}
          activeVariant={activeVariant}
          isVi={isVi}
        />

        {/* Cart Buttons */}
        <div className="sm:flex flex-wrap items-center gap-4">
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
                slug: product.slug,
                locale: isVi ? "vi" : "en",
              }
            }
            isDetailPage
          />
          <div className="flex flex-wrap items-center gap-4 sm:mt-0 mt-4">
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
              onClick={goToCheckout}
            >
              <CreditCardIcon className="w-5 h-5 mr-2" /> {t("buy_now")}
            </Button>
          </div>
        </div>

        <div className="bg-border !mt-7 !mb-5 w-full h-[0.5px]"></div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3 text-muted">
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
            <span className="font-bold">Kindle Hope Candles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
