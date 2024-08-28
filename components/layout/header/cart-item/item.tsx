import { CartProduct } from "@/entities/cart-product.entity";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { formatCurrencyVND } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface Props {
  cartState: any;
  cartItem: CartProduct | undefined;
  t: any;
}

const Item: FC<Props> = ({ cartState, cartItem, t }): JSX.Element => {
  const locale = useLocale();
  const isVi = locale === "vi";

  const increaseQuantity = () => {
    if (cartItem) {
      cartState.addToCart(cartItem);
    }
  };

  const decreaseQuantity = () => {
    if (cartItem) {
      cartState.subtractFromCart(cartItem);
    }
  };

  const inputChangeHandler = (e: any) => {
    const value = e.target.value;

    if (value < 1) {
      return;
    }

    if (value > parseInt(cartItem?.stock || "0")) {
      toast.error("Cannot add more anymore", {
        description: "You can only add up to " + cartItem?.stock,
      });
      return;
    }

    if (cartItem) {
      cartState.addMultipleToCart(cartItem, parseInt(value));
    }
  };

  return (
    <div className="flex items-start gap-4 relative mb-4">
      <div className="rounded-sm border relative w-[100px] h-[100px]">
        <Image
          src={cartItem?.image || ""}
          alt={(isVi ? cartItem?.name?.vi : cartItem?.name?.en) || ""}
          className="rounded-sm"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="space-y-1 flex-1">
        <p className="font-bold text-xs line-clamp-1">
          {isVi ? cartItem?.name?.vi : cartItem?.name?.en}
        </p>
        <p className="text-muted text-xs">
          <span className="font-bold">{t("scent")}: </span>
          {cartItem?.scent}
        </p>
        <p className="text-muted text-xs">
          <span className="font-bold">{t("price")}: </span>
          {formatCurrencyVND(cartItem?.price || 0)}
        </p>
        <p className="text-muted text-xs">
          <span className="font-bold">{t("total_price")}: </span>
          {formatCurrencyVND(
            parseFloat(cartItem?.price || "0") * (cartItem?.quantity || 0) || 0
          )}
        </p>

        <div className="flex items-center">
          <button
            onClick={decreaseQuantity}
            className="bg-secondary hover:bg-primary hover:text-white transition-all text-gray-700 rounded-sm w-5 h-5 flex items-center justify-center"
          >
            <MinusIcon className="w-2 h-2" />
          </button>
          <Input
            type="text"
            value={cartItem?.quantity}
            className="text-center w-12 h-5 mx-2 border rounded-sm bg-white"
            onChange={(e) => inputChangeHandler(e)}
          />
          <button
            onClick={increaseQuantity}
            className="bg-secondary hover:bg-primary hover:text-white transition-all text-gray-700 rounded-sm w-5 h-5 flex items-center justify-center"
          >
            <PlusIcon className="w-2 h-2" />
          </button>
        </div>
      </div>

      <button
        className="bg-red-500 w-5 h-5 rounded-full absolute top-0 right-0 grid place-items-center text-white"
        onClick={() => {
          if (cartItem) cartState.removeFromCart(cartItem);
        }}
      >
        <XIcon className="w-3 h-3" />
      </button>
    </div>
  );
};

export default Item;
