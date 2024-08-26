import { LocalizedString } from "@/entities/common.entity";
import { FC, useState } from "react";
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
}

const ProductDescVsReviews: FC<Props> = ({
  t,
  isVi,
  description,
  product_id,
  product_name,
  variants,
}): JSX.Element => {
  const [shownContent, setShownContent] = useState("desc");
  return (
    <div className="relative">
      <div className="font-grey_qo flex items-center bg-white rounded-[40px] text-4xl absolute -top-10 left-1/2 -translate-x-1/2 w-fit shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)]">
        <button
          className={cn(
            "py-[18px] px-[50px] transition rounded-l-[40px]",
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
            "py-[18px] px-[50px] transition rounded-r-[40px]",
            shownContent === "reviews"
              ? "bg-secondary text-primary"
              : "hover:bg-secondary/50 hover:text-primary"
          )}
          onClick={() => setShownContent("reviews")}
        >
          {t("reviews")}(0)
        </button>
      </div>

      <div className="pt-24 pb-20">
        {shownContent === "desc" ? (
          <ProductDesc t={t} isVi={isVi} description={description} />
        ) : (
          <ProductReviews
            t={t}
            product_id={product_id}
            product_name={product_name}
            variants={variants}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDescVsReviews;
