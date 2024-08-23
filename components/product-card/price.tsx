import { Product } from "@/entities/product.entity";
import { cn, formatCurrencyVND, isDiscounted } from "@/lib/utils";
import { FC } from "react";

interface Props {
  activeVariant: Product["variants"][0];
  isDetailPage?: boolean;
}

const Price: FC<Props> = ({ activeVariant, isDetailPage }): JSX.Element => {
  return (
    <>
      {isDiscounted(activeVariant) ? (
        <p className="text-left">
          <span
            className={cn(
              "mr-4 text-muted line-through",
              isDetailPage ? "text-lg" : "text-sm"
            )}
          >
            {formatCurrencyVND(activeVariant.price)}
          </span>
          <span
            className={cn(
              "font-bold",
              isDetailPage ? "text-3xl" : "text-xl text-primary"
            )}
          >
            {formatCurrencyVND(activeVariant.discountedPrice as string)}
          </span>
        </p>
      ) : (
        <p
          className={cn(
            "text-left text-primary font-bold",
            isDetailPage ? "text-3xl" : "text-xl"
          )}
        >
          {formatCurrencyVND(activeVariant.price)}
        </p>
      )}
    </>
  );
};

export default Price;
