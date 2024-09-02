import { Input } from "@/components/ui/input";
import { formatCurrencyVND } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface Props {
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
  t: any;
}

const PriceFilter: FC<Props> = ({ t, range, setRange }): JSX.Element => {
  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/[^0-9-]/g, ""));
  };

  const setLowestPrice = (value: number) => {
    if (value > range[1]) {
      setRange([range[1], range[1]]);
      return;
    }

    setRange([value, range[1]]);
  };

  const setHighestPrice = (value: number) => {
    setRange([range[0], value]);
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <div>
          <Label htmlFor="lowest_price" className="text-xs text-muted">
            {t("lowest_price")}
          </Label>
          <Input
            id="lowest_price"
            value={formatCurrencyVND(range[0] || 0)}
            onChange={(e) => setLowestPrice(parseCurrency(e.target.value))}
          />
        </div>
        <div className="h-[0.5px] w-2 bg-muted mt-5"></div>
        <div>
          <Label className="text-xs text-muted" htmlFor="highest_price">
            {t("highest_price")}
          </Label>
          <Input
            id="highest_price"
            value={formatCurrencyVND(range[1] || 0)}
            onChange={(e) => setHighestPrice(parseCurrency(e.target.value))}
          />
        </div>
      </div>

      <RangeSlider
        value={range}
        min={0}
        max={2000000}
        onInput={setRange}
        id="price-range"
      />
    </>
  );
};

export default PriceFilter;
