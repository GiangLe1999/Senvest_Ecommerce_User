import { LocalizedString } from "@/entities/common.entity";
import { Variant } from "@/entities/variant.entity";
import { FC } from "react";
import AddReviewForm from "./add-review-form";

interface Props {
  t: any;
  product_id: string;
  product_name: LocalizedString;
  variants: Variant[];
}

const ProductReviews: FC<Props> = ({
  t,
  product_id,
  product_name,
  variants,
}): JSX.Element => {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-2">{t("reviews")}</h2>
        <p>{t("no_reviews")}</p>
      </div>

      <AddReviewForm
        t={t}
        product_id={product_id}
        product_name={product_name}
        variants={variants}
      />
    </div>
  );
};

export default ProductReviews;
