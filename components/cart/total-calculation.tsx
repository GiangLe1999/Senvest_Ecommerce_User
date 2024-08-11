import { FC } from "react";
import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatCurrencyVND } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { CreditCardIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  totalPrice: number;
  t: any;
}

const TotalCalculation: FC<Props> = ({ totalPrice, t }): JSX.Element => {
  return (
    <>
      <DrawerHeader className="p-5">
        <DrawerTitle>{t("order_summary")}</DrawerTitle>
        <DrawerDescription>{t("click_checkout")}</DrawerDescription>
      </DrawerHeader>
      <div className="px-5">
        <Separator className="mb-5" />
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">{t("subtotal")}:</span>
          <span className="font-bold text-base">
            {formatCurrencyVND(totalPrice || 0)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">{t("shipping_cost")}:</span>
          <span className="font-bold text-base">{formatCurrencyVND(0)}</span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">{t("tax")}:</span>
          <span className="font-bold text-base">{formatCurrencyVND(0)}</span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted">{t("total")}:</span>
          <span className="font-bold text-base">
            {formatCurrencyVND(totalPrice || 0)}
          </span>
        </div>

        <Separator className="mt-5" />
      </div>

      <DrawerFooter className="p-5 space-y-2">
        <Button className="hover:bg-primary">
          {t("checkout")} <CreditCardIcon className="w-4 h-4 ml-1" />
        </Button>
        <Button variant="outline" className="text-white">
          {t("view_cart")}
          <ShoppingCartIcon className="w-4 h-4 ml-1" />
        </Button>
      </DrawerFooter>
    </>
  );
};

export default TotalCalculation;
