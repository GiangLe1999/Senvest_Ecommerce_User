"use client";

import { ShoppingBagIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FC } from "react";

import { useTranslations } from "next-intl";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import TotalCalculation from "./total-calculation";
import CartItem from "./cart-item";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Empty from "../empty";
import CartTableHeader from "./cart-table-header";

interface Props {}

export const Cart: FC<Props> = () => {
  const cartState = useFromStore(useCartStore, (state) => state);
  const t = useTranslations("cart");

  return (
    <Drawer>
      <DrawerTrigger className="fixed left-4 bottom-4 flex items-center h-[30px] rounded-sm border border-black z-50">
        <div className="bg-black text-white grid place-items-center w-[30px] h-full rounded-l-sm">
          <ShoppingBagIcon className="w-4 h-4" />
        </div>
        <div className="bg-white rounded-r-sm flex-1 h-full grid place-items-center text-sm px-2">
          {cartState?.totalItems || 0} {t("items")}
        </div>
      </DrawerTrigger>

      <DrawerContent className="z-[102]">
        <div className="sm:flex">
          <div className="flex-1">
            <DrawerHeader className="p-5 relative">
              <DrawerTitle>{t("your_cart")}</DrawerTitle>
              <DrawerClose className="sm:hidden block absolute right-4 top-4">
                <div className="bg-red-500 text-white w-5 h-5 rounded-full grid place-items-center text-xs">
                  X
                </div>
              </DrawerClose>
              <DrawerDescription>
                {t("there_are")} {cartState?.totalItems}{" "}
                {t("items_in_your_cart")}.
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="px-5 h-[280px]">
              <Separator className="mb-3" />

              {cartState?.cart?.length === 0 ? (
                <Empty />
              ) : (
                <table className="w-full">
                  <CartTableHeader />
                  <tbody>
                    {cartState?.cart?.map((item) => (
                      <CartItem cartItem={item} t={t} key={item.variant_id} />
                    ))}
                  </tbody>
                </table>
              )}

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="sm:w-[30%] w-full bg-[#F5F5F6]">
            <TotalCalculation
              totalPrice={cartState?.totalPrice || 0}
              t={t}
              totalItems={cartState?.totalItems}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
