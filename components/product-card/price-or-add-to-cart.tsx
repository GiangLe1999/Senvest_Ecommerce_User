import { FC } from "react";
import { Product } from "@/entities/product.entity";
import { cn } from "@/lib/utils";
import Price from "./price";

interface Props {
  t: any;
  activeVariant: Product["variants"][0];
  showAddToCartBtn: boolean;
  addToCartHandler: () => void;
}

const PriceOrAddToCart: FC<Props> = ({
  activeVariant,
  t,
  showAddToCartBtn,
  addToCartHandler,
}): JSX.Element => {
  return (
    <div className="relative w-[150px]">
      <div
        className={cn(
          "text-sm !leading-7 transition-all duration-500 absolute z-10 inset-0 p-0 cursor-pointer h-[28px] hover:text-primary hover:underline text-muted text-left",
          showAddToCartBtn
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-6"
        )}
        onClick={addToCartHandler}
      >
        + {t("add_to_cart")}
      </div>
      <div
        className={cn(
          "transition-all duration-500",
          showAddToCartBtn
            ? "opacity-0 translate-x-12"
            : "opacity-100 translate-x-0"
        )}
      >
        <Price activeVariant={activeVariant} />
      </div>
    </div>
  );
};

export default PriceOrAddToCart;
