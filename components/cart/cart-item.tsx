import { CartProduct } from "@/entities/cart-product.entity";
import {
  MinusIcon,
  PlusIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { Input } from "../ui/input";
import { formatCurrencyVND } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";
import { Link } from "@/configs/i18n-navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  cartItem: CartProduct | undefined;
  t: any;
  isCartPage?: boolean;
}

const CartItem: FC<Props> = ({ cartItem, t, isCartPage }): JSX.Element => {
  const locale = useLocale();
  const isVi = locale === "vi";

  const cartState = useCartStore((state) => state);

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
        position: "top-right",
      });
      return;
    }

    if (cartItem) {
      cartState.addMultipleToCart(cartItem, parseInt(value));
    }
  };

  return (
    <div className="my-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 w-[40%]">
          <div className="border rounded-sm">
            <Image
              src={cartItem?.image || ""}
              alt={(isVi ? cartItem?.name?.vi : cartItem?.name?.en) || ""}
              width={100}
              height={100}
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-sm">
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
          </div>
        </div>

        <div className="w-[20%]">
          <div className="flex items-center">
            <button
              onClick={decreaseQuantity}
              className="bg-secondary hover:bg-primary hover:text-white transition-all text-gray-700 rounded-sm w-8 h-8 flex items-center justify-center"
            >
              <MinusIcon className="w-3 h-3" />
            </button>
            <Input
              type="text"
              value={cartItem?.quantity}
              className="text-center w-12 h-8 mx-2 border rounded-sm bg-white"
              onChange={(e) => inputChangeHandler(e)}
            />
            <button
              onClick={increaseQuantity}
              className="bg-secondary hover:bg-primary hover:text-white transition-all text-gray-700 rounded-sm w-8 h-8 flex items-center justify-center"
            >
              <PlusIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="w-[25%]">
          <p className="line-clamp-1">
            <span className="text-sm text-muted">{t("total_price")}: </span>
            <span className="font-bold">
              {formatCurrencyVND(
                parseFloat(cartItem?.price || "0") *
                  (cartItem?.quantity || 0) || 0
              )}
            </span>
          </p>
        </div>

        <div className="flex-1">
          {isCartPage ? (
            <div className="flex items-center gap-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      className="bg-red-500 h-8 w-8 grid place-items-center"
                      variant="destructive"
                      onClick={() => {
                        if (cartItem) cartState.removeFromCart(cartItem);
                      }}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="center" className="bg-black">
                    <p>{t("remove")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="/"
                      className="bg-background w-8 h-8 grid place-items-center text-white rounded-sm"
                      target="_blank"
                    >
                      <SquareArrowOutUpRightIcon className="w-4 h-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent align="center" className="bg-black">
                    <p>{t("see_details")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <Button
              className="bg-red-500 h-8"
              variant="destructive"
              onClick={() => {
                if (cartItem) cartState.removeFromCart(cartItem);
              }}
            >
              <Trash2Icon className="w-3 h-3 mr-1" /> {t("remove")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
