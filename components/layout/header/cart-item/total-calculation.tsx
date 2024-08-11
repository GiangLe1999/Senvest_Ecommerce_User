import { Button } from "@/components/ui/button";
import { formatCurrencyVND } from "@/lib/utils";
import { CreditCardIcon, ShoppingCartIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  totalPrice: number;
}

const TotalCalculation: FC<Props> = ({ totalPrice }): JSX.Element => {
  return (
    <div className="px-4 pb-5">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-muted">Subtotal:</span>
        <span className="font-bold text-sm">
          {formatCurrencyVND(totalPrice || 0)}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-muted">Shipping cost:</span>
        <span className="font-bold text-sm">{formatCurrencyVND(0)}</span>
      </div>

      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-muted">Estimated tax:</span>
        <span className="font-bold text-sm">{formatCurrencyVND(0)}</span>
      </div>

      <div className="flex items-center justify-between text-xs mb-4">
        <span className="text-muted">Estimated total:</span>
        <span className="font-bold text-sm">
          {formatCurrencyVND(totalPrice || 0)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button className="hover:bg-primary w-full">
          Checkout <CreditCardIcon className="w-4 h-4 ml-1" />
        </Button>
        <Button variant="outline" className="text-white w-full">
          View cart
          <ShoppingCartIcon className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default TotalCalculation;
