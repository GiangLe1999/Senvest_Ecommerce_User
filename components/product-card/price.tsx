import { Product } from "@/entities/product.entity";
import { formatCurrencyVND, isDiscounted } from "@/lib/utils";
import { FC } from "react";

interface Props {
  activeVariant: Product["variants"][0];
}

const Price: FC<Props> = ({ activeVariant }): JSX.Element => {
  return (
    <>
      {isDiscounted(activeVariant) ? (
        <p className="text-left">
          <span className="mr-4 text-sm text-muted line-through">
            {formatCurrencyVND(activeVariant.price)}
          </span>
          <span className="text-primary font-bold text-xl">
            {formatCurrencyVND(activeVariant.discountedPrice as string)}
          </span>
        </p>
      ) : (
        <p className="text-left text-primary font-bold text-xl">
          {formatCurrencyVND(activeVariant.price)}
        </p>
      )}
    </>
  );
};

export default Price;
