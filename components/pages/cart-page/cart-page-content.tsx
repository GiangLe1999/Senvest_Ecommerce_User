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
import CartTableHeader from "@/components/cart/cart-table-header";

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
        {cartState?.cart?.length === 0 ? (
          <Empty />
        ) : (
          <ScrollArea className="xl:flex-1 w-full mt-5 h-fit pb-6">
            <table className="w-full">
              <CartTableHeader />

              <tbody>
                {cartState?.cart?.map((item) => (
                  <CartItem
                    isCartPage
                    cartItem={item}
                    key={item.variant_id}
                    t={t}
                  />
                ))}
              </tbody>
            </table>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

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
