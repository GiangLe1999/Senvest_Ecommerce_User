import { LocalizedString } from "@/entities/common.entity";
import { FC } from "react";
import ProductDesc from "./product-desc";
import ProductReviews from "./product-reviews";
import { cn } from "@/lib/utils";
import { Variant } from "@/entities/variant.entity";

interface Props {
  t: any;
  isVi: boolean;
  description: LocalizedString;
  product_id: string;
  product_name: LocalizedString;
  variants: Variant[];
  nums_of_reviews: number;
  rating: string;
  shownContent: string;
  setShownContent: React.Dispatch<React.SetStateAction<"desc" | "reviews">>;
}

const ProductDescVsReviews: FC<Props> = ({
  t,
  isVi,
  description,
  product_id,
  product_name,
  variants,
  rating,
  nums_of_reviews,
  shownContent,
  setShownContent,
}): JSX.Element => {
  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-[40px] lg:text-xl sm:text-lg text-base font-bold absolute -top-10 left-1/2 -translate-x-1/2 w-max shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)]">
        <button
          className={cn(
            "py-[18px] lg:px-[50px] px-[30px] transition rounded-l-[40px]",
            shownContent === "desc"
              ? "bg-secondary text-primary"
              : "hover:bg-secondary/50 hover:text-primary"
          )}
          onClick={() => setShownContent("desc")}
        >
          {t("description")}
        </button>
        <button
          className={cn(
            "py-[18px] lg:px-[50px] px-[30px] transition rounded-r-[40px]",
            shownContent === "reviews"
              ? "bg-secondary text-primary"
              : "hover:bg-secondary/50 hover:text-primary"
          )}
          onClick={() => setShownContent("reviews")}
        >
          {t("reviews")} ({nums_of_reviews})
        </button>
      </div>

      <div className="pt-24 sm:pb-20 pb-10">
        {shownContent === "desc" ? (
          <ProductDesc t={t} isVi={isVi} description={description} />
        ) : (
          <ProductReviews
            t={t}
            product_id={product_id}
            nums_of_reviews={nums_of_reviews}
            product_name={product_name}
            rating={rating}
            variants={variants}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDescVsReviews;
