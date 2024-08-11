"use client";

import { ShoppingBagIcon } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FC, useState } from "react";

import { useTranslations } from "next-intl";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import TotalCalculation from "./total-calculation";
import CartItem from "./cart-item";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Empty from "../empty";

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

      <DrawerContent>
        <div className="flex">
          <div className="flex-1">
            <DrawerHeader className="p-5">
              <DrawerTitle>Your Cart</DrawerTitle>
              <DrawerDescription>
                There are {cartState?.totalItems} items in your cart.
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="px-5 h-[280px]">
              <Separator className="mb-5" />

              {cartState?.cart?.length === 0 ? (
                <Empty />
              ) : (
                cartState?.cart?.map((item) => (
                  <CartItem cartItem={item} key={item.variant_id} />
                ))
              )}
            </ScrollArea>
          </div>

          <div className="w-[30%] bg-[#F5F5F6]">
            <TotalCalculation totalPrice={cartState?.totalPrice || 0} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
