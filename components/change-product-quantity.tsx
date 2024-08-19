import { CartProduct } from "@/entities/cart-product.entity";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FC } from "react";
import { Input } from "./ui/input";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  cartItem: CartProduct | undefined;
  isDetailPage?: boolean;
}

const ChangeProductQuantity: FC<Props> = ({
  cartItem,
  isDetailPage,
}): JSX.Element => {
  const { addToCart, subtractFromCart, addMultipleToCart } = useCartStore(
    (state) => state
  );

  const t = useTranslations("change_product_quantity");

  const increaseQuantity = () => {
    if (cartItem) {
      addToCart(cartItem);
    }

    toast.success(t("success"), {
      description: t("success_desc"),
      position: "top-right",
    });
  };

  const decreaseQuantity = () => {
    if (cartItem) {
      subtractFromCart(cartItem);
    }
  };

  const inputChangeHandler = (e: any) => {
    const value = e.target.value;

    if (value < 1) {
      return;
    }

    if (value > parseInt(cartItem?.stock || "0")) {
      toast.error(t("fail"), {
        description: t("fail_desc") + cartItem?.stock,
        position: "top-right",
      });
      return;
    }

    if (cartItem) {
      addMultipleToCart(cartItem, parseInt(value));

      toast.success(t("success"), {
        description: t("success_desc"),
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decreaseQuantity}
        className={cn(
          "bg-secondary hover:bg-primary hover:text-white transition-all text-gray-700 rounded-sm  flex items-center justify-center",
          isDetailPage ? "w-11 h-11" : "w-8 h-8"
        )}
      >
        <MinusIcon className="w-3 h-3" />
      </button>
      <Input
        type="text"
        value={cartItem?.quantity}
        className={cn(
          "text-center mx-2 border rounded-sm bg-white",
          isDetailPage ? "h-11 w-16" : "h-8 w-12"
        )}
        onChange={inputChangeHandler}
      />
      <button
        onClick={increaseQuantity}
        className={cn(
          "bg-secondary hover:bg-primary hover:text-white transition-all text-gray-700 rounded-sm  flex items-center justify-center",
          isDetailPage ? "w-11 h-11" : "w-8 h-8"
        )}
      >
        <PlusIcon className="w-3 h-3" />
      </button>
    </div>
  );
};

export default ChangeProductQuantity;
