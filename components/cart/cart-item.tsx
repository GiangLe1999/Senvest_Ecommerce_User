import { CartProduct } from "@/entities/cart-product.entity";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { Input } from "../ui/input";
import { formatCurrencyVND } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";

interface Props {
  cartItem: CartProduct | undefined;
}

const CartItem: FC<Props> = ({ cartItem }): JSX.Element => {
  console.log(cartItem);
  const locale = useLocale();
  const isVi = locale === "vi";

  const cartState = useCartStore((state) => state);

  return (
    <div className="my-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 w-[40%]">
          <div className="border rounded-sm">
            <Image
              src={cartItem?.image || ""}
              alt={(isVi ? cartItem?.name.vi : cartItem?.name.en) || ""}
              width={100}
              height={100}
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-sm">
              {isVi ? cartItem?.name.vi : cartItem?.name.en}
            </p>
            <p className="text-muted text-xs">
              <span className="font-bold">Scent: </span>
              {cartItem?.scent}
            </p>
            <p className="text-muted text-xs">
              <span className="font-bold">Price: </span>
              {formatCurrencyVND(cartItem?.price || 0)}
            </p>
          </div>
        </div>

        <div className="w-[20%]">
          <div className="flex items-center">
            <button
              // onClick={handleDecrement}
              className="bg-secondary text-gray-700 rounded-sm w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MinusIcon className="w-3 h-3" />
            </button>
            <Input
              type="text"
              value={cartItem?.quantity}
              readOnly
              className="text-center w-12 h-8 mx-2 border rounded-sm bg-white"
            />
            <button
              // onClick={handleIncrement}
              // disabled={quantity >= max}
              className="bg-secondary text-gray-700 rounded-sm w-8 h-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="w-[25%]">
          <p className="line-clamp-1">
            <span className="text-sm text-muted">Total price: </span>
            <span className="font-bold">
              {formatCurrencyVND(
                parseFloat(cartItem?.price || "0") *
                  (cartItem?.quantity || 0) || 0
              )}
            </span>
          </p>
        </div>

        <div className="flex-1">
          <Button
            className="bg-red-500 h-8"
            variant="destructive"
            onClick={() => {
              if (cartItem) cartState.removeFromCart(cartItem);
            }}
          >
            <Trash2Icon className="w-3 h-3 mr-1" /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
