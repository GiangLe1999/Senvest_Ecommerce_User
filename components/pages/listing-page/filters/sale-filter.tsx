import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  t: any;
  salesCount: number;
  atFullPriceCount: number;
  filterSales: string;
  setFilterSales: React.Dispatch<React.SetStateAction<string>>;
}

const SaleFilter: FC<Props> = ({
  t,
  salesCount,
  atFullPriceCount,
  filterSales,
  setFilterSales,
}): JSX.Element => {
  return (
    <RadioGroup
      value={filterSales}
      onValueChange={setFilterSales}
      className="space-y-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="on_sale"
          id="on_sale"
          disabled={salesCount === 0}
        />
        <Label
          htmlFor="on_sale"
          className={cn(
            "cursor-pointer flex items-center justify-between w-full",
            salesCount === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          {t("on_sale")}{" "}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {salesCount}
          </span>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="at_full_price"
          id="at_full_price"
          disabled={atFullPriceCount === 0}
        />
        <Label
          htmlFor="at_full_price"
          className={cn(
            "cursor-pointer flex items-center justify-between w-full",
            atFullPriceCount === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          {t("at_full_price")}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {atFullPriceCount}
          </span>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default SaleFilter;
