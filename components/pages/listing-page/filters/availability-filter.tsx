import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  t: any;
  inStockCount: number;
  outStockCount: number;
  filterStock: string;
  setFilterStock: React.Dispatch<React.SetStateAction<string>>;
}

const AvailabilityFilter: FC<Props> = ({
  t,
  inStockCount,
  outStockCount,
  filterStock,
  setFilterStock,
}): JSX.Element => {
  return (
    <RadioGroup
      value={filterStock}
      onValueChange={setFilterStock}
      className="space-y-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="in_stock"
          id="in_stock"
          disabled={inStockCount === 0}
        />
        <Label
          htmlFor="in_stock"
          className={cn(
            "cursor-pointer flex items-center justify-between w-full",
            inStockCount === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          {t("in_stock")}{" "}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {inStockCount}
          </span>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="out_of_stock"
          id="out_of_stock"
          disabled={outStockCount === 0}
        />
        <Label
          htmlFor="out_of_stock"
          className={cn(
            "cursor-pointer flex items-center justify-between w-full",
            outStockCount === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          {t("out_of_stock")}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {outStockCount}
          </span>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default AvailabilityFilter;
