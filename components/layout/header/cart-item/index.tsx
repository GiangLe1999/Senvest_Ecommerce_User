"use client";

import { FC } from "react";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from "@/components/hybrid-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShoppingBagIcon } from "lucide-react";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import TotalCalculation from "./total-calculation";
import Empty from "@/components/empty";
import Item from "./item";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@/configs/i18n-navigation";

interface Props {}

const CartItem: FC<Props> = (props): JSX.Element => {
  const cartState = useFromStore(useCartStore, (state) => state);
  const t = useTranslations("cart");
  const router = useRouter();

  return (
    <div onClick={(e) => router.push("/gio-hang")}>
      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
              <div className="relative">
                <ShoppingBagIcon className="w-5 h-5" />
                <div className="bg-primary w-4 h-4 grid place-items-center leading-none text-[10px] rounded-full text-white absolute -top-2 -right-1">
                  {cartState?.totalItems || 0}
                </div>
              </div>
            </HybridTooltipTrigger>
            <HybridTooltipContent
              align="end"
              className="border shadow-md rounded-sm text-foreground w-[350px] p-0"
            >
              <div className="flex items-center justify-between bg-primary text-white px-4 py-2 mb-4 rounde-t-sm">
                <div className="text-sm font-bold">{t("your_cart")}</div>
                <div className="text-sm font-bold">
                  {cartState?.totalItems || 0}{" "}
                  {cartState?.totalItems && cartState?.totalItems < 2
                    ? t("item")
                    : t("items")}
                </div>
              </div>

              <ScrollArea className="px-4 h-[230px]">
                {cartState?.cart?.length === 0 ? (
                  <Empty className="pt-4" />
                ) : (
                  cartState?.cart?.map((item) => (
                    <Item
                      cartItem={item}
                      key={item.variant_id}
                      cartState={cartState}
                      t={t}
                    />
                  ))
                )}
              </ScrollArea>

              <div className="px-4">
                <Separator className="mt-3 mb-4" />
              </div>

              <TotalCalculation
                totalPrice={cartState?.totalPrice || 0}
                t={t}
                totalItems={cartState?.totalItems || 0}
              />
            </HybridTooltipContent>
          </HybridTooltip>
        </TouchProvider>
      </TooltipProvider>
    </div>
  );
};

export default CartItem;
