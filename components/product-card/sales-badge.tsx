import { Product } from "@/entities/product.entity";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  activeVariant?: Product["variants"][0];
}

const SalesBadge: FC<Props> = ({ activeVariant }): JSX.Element => {
  const t = useTranslations("product_card");

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
