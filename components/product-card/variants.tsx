import { Product } from "@/entities/product.entity";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  product: Product;
  activeVariantIndex: number;
  setActiveVariantIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Variants: FC<Props> = ({
  product,
  activeVariantIndex,
  setActiveVariantIndex,
}): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-2">
      {product.variants.map((variant, index) => (
        <button
          key={variant.fragrance}
          onClick={() => setActiveVariantIndex(index)}
          className={cn(
            "px-2 py-1 rounded-md text-[10px] shadow-md",
            activeVariantIndex === index
              ? "bg-primary text-white"
              : "bg-white text-muted border"
          )}
        >
          {variant.fragrance}
        </button>
      ))}
    </div>
  );
};

export default Variants;
