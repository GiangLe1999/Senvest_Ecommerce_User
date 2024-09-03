import { FC } from "react";
import { VariantCount } from "../listing-page-content";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface Props {
  t: any;
  variantsCount: VariantCount[];
  filterScent: string;
  setFilterScent: React.Dispatch<React.SetStateAction<string>>;
}

const ScentFilter: FC<Props> = ({
  variantsCount,
  t,
  filterScent,
  setFilterScent,
}): JSX.Element => {
  return (
    <RadioGroup
      className="space-y-2"
      value={filterScent}
      onValueChange={setFilterScent}
    >
      {variantsCount.map((variant) => (
        <div className="flex items-center space-x-2" key={variant.scent}>
          <RadioGroupItem
            value={variant.scent}
            id={variant.scent}
            disabled={variant.count === 0}
          />

          <Label
            htmlFor={variant.scent}
            className={cn(
              "cursor-pointer flex items-center justify-between w-full",
              variant.count === 0 && "opacity-50 cursor-not-allowed"
            )}
          >
            {variant.scent}
            <span className="w-4 h-4 text-[10px] grid place-items-center bg-primary text-white rounded-sm shadow-md">
              {variant.count}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default ScentFilter;
