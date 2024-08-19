"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import TotalCalculation from "./total-calculation";
import { Separator } from "@/components/ui/separator";
import Empty from "@/components/empty";
import SmallSectionContainer from "@/components/small-section-container";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import CartItem from "@/components/cart/cart-item";

interface Props {}

const CartPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("cart");
  const cartState = useFromStore(useCartStore, (state) => state);

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[{ name: t("breadcrumb"), link: "/gio-hang" }]}
      />

      <div className="flex">
        <div className="flex-1">
          <div className="pt-5 pr-10">
            <div className="flex items-center gap-4">
              <div className="w-[40%] text-primary text-center font-bold text-sm flex items-center">
                <div className="w-[100px]">{t("image")}</div>
                <div className="flex-1">{t("details")}</div>
              </div>

              <div className="w-[20%] text-primary ml-5 font-bold text-sm">
                {t("quantity")}
              </div>

              <div className="w-[25%] -ml-3 text-primary font-bold text-sm">
                {t("total_price")}
              </div>

              <div className="flex-1 text-primary font-bold text-sm">
                {t("actions")}
              </div>
            </div>
            <Separator className="mt-2 mb-6" />

            {cartState?.cart?.length === 0 ? (
              <Empty />
            ) : (
              cartState?.cart?.map((item) => (
                <CartItem
                  isCartPage
                  cartItem={item}
                  key={item.variant_id}
                  t={t}
                />
              ))
            )}
          </div>
        </div>

        <div className="w-[30%] bg-[#F5F5F6] rounded-sm h-fit">
          <TotalCalculation
            totalPrice={cartState?.totalPrice || 0}
            t={t}
            totalItems={cartState?.totalItems || 0}
          />
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default CartPageContent;
