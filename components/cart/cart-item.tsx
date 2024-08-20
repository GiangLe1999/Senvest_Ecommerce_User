import { CartProduct } from "@/entities/cart-product.entity";
import { SquareArrowOutUpRightIcon, Trash2Icon } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { formatCurrencyVND } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { Link } from "@/configs/i18n-navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChangeProductQuantity from "../change-product-quantity";

interface Props {
  cartItem: CartProduct | undefined;
  t: any;
  isCartPage?: boolean;
}

const CartItem: FC<Props> = ({ cartItem, t, isCartPage }): JSX.Element => {
  const locale = useLocale();
  const isVi = locale === "vi";
  const { removeFromCart } = useCartStore((state) => state);

  return (
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
        <div className="space-y-2 text-left">
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
        <ChangeProductQuantity cartItem={cartItem} />
      </div>

      <div className="w-[25%]">
        <p className="line-clamp-1">
          <span className="text-sm text-muted">{t("total_price")}: </span>
          <span className="font-bold">
            {formatCurrencyVND(
              parseFloat(cartItem?.price || "0") * (cartItem?.quantity || 0) ||
                0
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (cartItem) removeFromCart(cartItem);
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
                    href={
                      `/san-pham/${
                        isVi ? cartItem?.slug?.vi : cartItem?.slug?.en
                      }` as any
                    }
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
            onClick={(e) => {
              e.stopPropagation();
              if (cartItem) removeFromCart(cartItem);
            }}
          >
            <Trash2Icon className="w-3 h-3 mr-1" /> {t("remove")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
