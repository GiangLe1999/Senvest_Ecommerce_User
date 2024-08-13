import { Button } from "@/components/ui/button";
import { Link } from "@/configs/i18n-navigation";
import { formatCurrencyVND } from "@/lib/utils";
import { CreditCardIcon, ShoppingCartIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  totalPrice: number;
  t: any;
}

const TotalCalculation: FC<Props> = ({ totalPrice, t }): JSX.Element => {
  return (
    <div className="px-4 pb-5">
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

      <div className="flex items-center justify-between text-xs mb-4">
        <span className="text-muted">{t("total")}:</span>
        <span className="font-bold text-sm">
          {formatCurrencyVND(totalPrice || 0)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/thanh-toan"
          className="flex items-center justify-center px-4 w-full h-10 bg-primary text-white rounded-sm"
        >
          {t("checkout")} <CreditCardIcon className="w-4 h-4 ml-1" />
        </Link>
        <Link
          href="/gio-hang"
          className="flex bg-background items-center justify-center px-4 w-full h-10 text-white rounded-sm"
        >
          {t("view_cart")}
          <ShoppingCartIcon className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default TotalCalculation;
