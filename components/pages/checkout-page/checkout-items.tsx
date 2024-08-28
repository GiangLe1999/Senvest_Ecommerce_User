import { CartProduct } from "@/entities/cart-product.entity";
import { cn, formatCurrencyVND } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

interface Props {
  cart: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

const CheckoutItems: FC<Props> = ({
  cart,
  totalItems,
  totalPrice,
}): JSX.Element => {
  const isVi = useLocale() === "vi";
  const t = useTranslations("cart");

  return (
    <div className="bg-white p-5 border shadow-md rounded-sm">
      <h1 className="font-bold text-2xl text-primary mb-2">
        {t("order_summary")}
      </h1>
      <p className="text-sm text-muted">
        {t("there_are")} {totalItems} {t("items_in_your_order")}
      </p>

      <div className="mt-8">
        <ul>
          {cart.map((cartItem, index) => (
            <li
              key={cartItem.variant_id}
              className={cn(
                "py-3",
                index === cart.length - 1 ? "border-y" : "border-t"
              )}
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-4 w-[70%]">
                  <div className="rounded-sm border relative w-[50px] h-[50px]">
                    <Image
                      src={cartItem?.image || ""}
                      alt={
                        (isVi ? cartItem?.name?.vi : cartItem?.name?.en) || ""
                      }
                      className="rounded-sm"
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs line-clamp-1">
                      {isVi ? cartItem?.name?.vi : cartItem?.name?.en}
                    </p>
                    <p className="text-muted text-xs">{cartItem?.scent}</p>
                    <p className="text-muted text-xs">
                      {cartItem.quantity} x{" "}
                      {formatCurrencyVND(cartItem?.price || 0)}
                    </p>
                  </div>
                </div>

                <div className="flex-1 text-primary text-right">
                  {cartItem?.price &&
                    formatCurrencyVND(
                      parseFloat(cartItem.price) * cartItem?.quantity
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted">{t("subtotal")}:</span>
          <span className="font-bold text-sm">
            {formatCurrencyVND(totalPrice || 0)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted">{t("shipping_cost")}:</span>
          <span className="font-bold text-sm">{formatCurrencyVND(0)}</span>
        </div>

        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted">{t("tax")}:</span>
          <span className="font-bold text-sm">{formatCurrencyVND(0)}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">{t("total")}:</span>
          <span className="font-black text-lg text-primary">
            {formatCurrencyVND(totalPrice || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItems;
