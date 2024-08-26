import { LocalizedString } from "@/entities/common.entity";
import { Variant } from "@/entities/variant.entity";
import { FC } from "react";
import AddReviewForm from "./add-review-form";
import Empty from "@/components/empty";
import { Button } from "@/components/ui/button";
import { PencilLineIcon } from "lucide-react";

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
      <section id="reviews" className="mb-10">
        <h2 className="text-2xl font-bold mb-2">{t("reviews")}</h2>
        <Empty />
        <div className="text-center mt-4">
          <Button className="mb-20">
            {t("no_reviews")} <PencilLineIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section id="add-review">
        <AddReviewForm
          t={t}
          product_id={product_id}
          product_name={product_name}
          variants={variants}
        />
      </section>
    </div>
  );
};

export default ProductReviews;
