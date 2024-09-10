import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface Props {
  setSelectedCurrency: React.Dispatch<React.SetStateAction<"VND" | "USD">>;
  selectedCurrency: "VND" | "USD";
}

const CurrencySelect: React.FC<Props> = ({
  setSelectedCurrency,
  selectedCurrency,
}) => {
  return (
    <Select
      onValueChange={setSelectedCurrency as any}
      value={selectedCurrency as string}
    >
      <SelectTrigger className="bg-transparent focus-visible:ring-0 text-lg">
        <span className="mr-3 text-muted-foreground">{selectedCurrency}</span>
        <div className="w-[1px] h-[80%] bg-border mr-3"></div>
      </SelectTrigger>
      <SelectContent className="right-5 rounded-sm">
        <SelectGroup>
          <SelectItem value="VND">VND</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
