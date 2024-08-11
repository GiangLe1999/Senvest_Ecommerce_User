import { Product } from "@/entities/product.entity";
import { FC } from "react";

interface Props {
  t: any;
  activeVariant?: Product["variants"][0];
}

const SalesBadge: FC<Props> = ({ t, activeVariant }): JSX.Element => {
  const salesPercentage =
    activeVariant?.discountedPrice &&
    Math.round(
      ((parseFloat(activeVariant.price) -
        parseFloat(activeVariant.discountedPrice)) /
        parseFloat(activeVariant.price)) *
        100
    );

  return (
    <span className="sales-badge">
      {t("sales")} {salesPercentage}%
    </span>
  );
};

export default SalesBadge;
