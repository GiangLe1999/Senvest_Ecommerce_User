import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product } from "@/entities/product.entity";
import { FC } from "react";

interface Props {
  t: any;
  inStockCount: number;
  outStockCount: number;
}

const AvailabilityFilter: FC<Props> = ({
  t,
  inStockCount,
  outStockCount,
}): JSX.Element => {
  return (
    <ul className="space-y-4">
      <li className="flex items-center space-x-2">
        <Checkbox id="in_stock" />
        <Label
          htmlFor="in_stock"
          className="cursor-pointer flex items-center justify-between w-full"
        >
          {t("in_stock")}{" "}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {inStockCount}
          </span>
        </Label>
      </li>

      <li className="flex items-center space-x-2">
        <Checkbox id="out_of_stock" />
        <Label
          htmlFor="out_of_stock"
          className="cursor-pointer flex items-center justify-between w-full"
        >
          {t("out_of_stock")}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {outStockCount}
          </span>
        </Label>
      </li>
    </ul>
  );
};

export default AvailabilityFilter;
