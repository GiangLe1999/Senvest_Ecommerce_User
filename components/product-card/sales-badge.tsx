import { Product } from "@/entities/product.entity";
import { FC } from "react";

interface Props {
  t: any;
  activeVariant?: Product["variants"][0];
}

const SalesBadge: FC<Props> = ({ t, activeVariant }): JSX.Element => {
  const salesPercentage = Math.round(
    ((parseFloat(activeVariant?.price as string) -
      parseFloat(activeVariant?.discountedPrice as string)) /
      parseFloat(activeVariant?.price as string)) *
      100
  );

  return (
    <span className="sales-badge">
      {t("sales")} {salesPercentage}%
    </span>
  );
};

export default SalesBadge;
