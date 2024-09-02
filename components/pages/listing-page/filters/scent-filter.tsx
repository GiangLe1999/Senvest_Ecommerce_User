import { FC } from "react";
import { VariantCount } from "../listing-page-content";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  t: any;
  variantsCount: VariantCount[];
  filterScent: string[];
  setFilterScent: React.Dispatch<React.SetStateAction<string[]>>;
}

const ScentFilter: FC<Props> = ({
  variantsCount,
  t,
  filterScent,
  setFilterScent,
}): JSX.Element => {
  const toggleFilter = (value: string) => {
    if (filterScent.includes(value)) {
      setFilterScent(filterScent.filter((item) => item !== value));
    } else {
      setFilterScent([...filterScent, value]);
    }
  };

  return (
    <ul className="space-y-4">
      {variantsCount.map((variant) => (
        <li className="flex items-center space-x-2" key={variant.scent}>
          <Checkbox
            id={variant.scent}
            name="filter_scent"
            checked={filterScent.includes(variant.scent)}
            onClick={() => toggleFilter(variant.scent)}
          />

          <Label
            htmlFor={variant.scent}
            className="cursor-pointer flex items-center justify-between w-full"
          >
            {variant.scent}
            <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
              {variant.count}
            </span>
          </Label>
        </li>
      ))}
    </ul>
  );
};

export default ScentFilter;
