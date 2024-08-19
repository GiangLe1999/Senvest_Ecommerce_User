import { FC } from "react";
import { formatCurrencyVND } from "@/lib/utils";
import {
  CreditCardIcon,
  MoveLeftIcon,
  MoveRightIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Link, useRouter } from "@/configs/i18n-navigation";
import Features from "./features";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  totalPrice: number;
  totalItems: number;
  t: any;
}

const TotalCalculation: FC<Props> = ({
  totalPrice,
  totalItems,
  t,
}): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <div className="p-5 pt-4">
        <h1 className="text-xl font-bold mb-1">{t("order_summary")}</h1>
        <h2 className="text-sm text-muted">
          {t("there_are")} {totalItems} {t("items_in_your_cart")}.
        </h2>
      </div>
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

      <div className="px-5 py-6 space-y-4">
        <Button
          className="hover:bg-primary w-full"
          onClick={() => router.push("/thanh-toan")}
        >
          <CreditCardIcon className="w-4 h-4 mr-1" />
          {t("proceed_to_checkout")}
        </Button>
        <Button
          variant="outline"
          className="text-white p-0 w-full"
          onClick={() => router.push("/")}
        >
          <MoveLeftIcon className="w-4 h-4 mr-1" />
          {t("continue")}
        </Button>
      </div>

      <div className="p-5 pt-0">
        <Separator className="mb-5" />
        <Features t={t} />
      </div>
    </>
  );
};

export default TotalCalculation;
