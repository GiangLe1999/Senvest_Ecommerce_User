import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface Props {
  t: any;
  salesCount: number;
  atFullPriceCount: number;
  filterSales: string[];
  setFilterSales: React.Dispatch<React.SetStateAction<string[]>>;
}

const SaleFilter: FC<Props> = ({
  t,
  salesCount,
  atFullPriceCount,
  filterSales,
  setFilterSales,
}): JSX.Element => {
  const toggleFilter = (value: string) => {
    if (filterSales.includes(value)) {
      setFilterSales(filterSales.filter((item) => item !== value));
    } else {
      setFilterSales([...filterSales, value]);
    }
  };

  return (
    <ul className="space-y-4">
      <li className="flex items-center space-x-2">
        <Checkbox
          id="on_sale"
          name="filter_sales"
          checked={filterSales.includes("on_sale")}
          onClick={() => toggleFilter("on_sale")}
          disabled={salesCount === 0}
        />
        <Label
          htmlFor="on_sale"
          className="cursor-pointer flex items-center justify-between w-full"
        >
          {t("on_sale")}{" "}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {salesCount}
          </span>
        </Label>
      </li>

      <li className="flex items-center space-x-2">
        <Checkbox
          id="at_full_price"
          name="filter_sales"
          checked={filterSales.includes("at_full_price")}
          onClick={() => toggleFilter("at_full_price")}
          disabled={atFullPriceCount === 0}
        />
        <Label
          htmlFor="at_full_price"
          className="cursor-pointer flex items-center justify-between w-full"
        >
          {t("at_full_price")}
          <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
            {atFullPriceCount}
          </span>
        </Label>
      </li>
    </ul>
  );
};

export default SaleFilter;
