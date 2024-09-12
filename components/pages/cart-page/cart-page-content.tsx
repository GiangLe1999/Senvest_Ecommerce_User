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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {}

const CartPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("cart");
  const cartState = useFromStore(useCartStore, (state) => state);

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[{ name: t("breadcrumb"), link: "/gio-hang" }]}
      />

      <div className="xl:flex xl:gap-10">
        <ScrollArea className="xl:flex-1 w-full mt-5 h-fit pb-8">
          <table className="w-full">
            <thead className="border-b">
              <th className="w-[13%] sm:min-w-initial min-w-[250px] text-primary text-center font-bold text-sm pb-3">
                {t("image")}
              </th>

              <th className="px-4 w-[42%] min-w-[250px] text-primary text-center font-bold text-sm flex items-center pb-3">
                {t("details")}
              </th>

              <th className="w-[20%] min-w-[250px] text-primary ml-5 font-bold text-sm pb-3">
                {t("quantity")}
              </th>

              <th className="w-[15%] min-w-[250px] -ml-3 text-primary font-bold text-sm pb-3">
                {t("total_price")}
              </th>

              <th className="w-[10%] min-w-[250px] text-primary font-bold text-sm pb-3">
                {t("actions")}
              </th>
            </thead>

            <tbody>
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
            </tbody>
          </table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="xl:w-[30%] w-full bg-[#F5F5F6] rounded-sm h-fit xl:mt-0 mt-10">
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
