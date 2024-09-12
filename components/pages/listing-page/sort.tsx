import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown01Icon,
  ArrowDownAZIcon,
  ArrowDownNarrowWideIcon,
  ArrowUp01Icon,
  ArrowUpAZIcon,
  ArrowUpNarrowWideIcon,
  ArrowUpWideNarrowIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
} from "lucide-react";

interface Props {
  t: any;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

const Sort: FC<Props> = ({ t, sort, setSort }): JSX.Element => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="lg:block hidden"></div>
      <div className="flex items-center gap-4">
        <span className="font-bold">{t("sort_by")}:</span>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={t("sort_by_placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="pl-2">{t("sort_by_sales")}:</SelectLabel>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="best_selling"
              >
                <span className="flex items-center">
                  <ArrowUpWideNarrowIcon className="w-4 h-4 mr-2" />{" "}
                  {t("best_selling")}
                </span>
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="pl-2">{t("sort_by_name")}:</SelectLabel>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="a_to_z"
              >
                <span className="flex items-center">
                  <ArrowDownAZIcon className="w-4 h-4 mr-2" />
                  {t("a_to_z")}
                </span>
              </SelectItem>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="z_to_a"
              >
                <span className="flex items-center">
                  <ArrowUpAZIcon className="w-4 h-4 mr-2" />
                  {t("z_to_a")}
                </span>
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="pl-2">{t("sort_by_price")}:</SelectLabel>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="price_low_to_high"
              >
                <span className="flex items-center">
                  <ArrowDownNarrowWideIcon className="w-4 h-4 mr-2" />
                  {t("price_low_to_high")}
                </span>
              </SelectItem>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="price_high_to_low"
              >
                <span className="flex items-center">
                  <ArrowUpNarrowWideIcon className="w-4 h-4 mr-2" />
                  {t("price_high_to_low")}
                </span>
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="pl-2">{t("sort_by_date")}:</SelectLabel>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="date_new_to_old"
              >
                <span className="flex items-center">
                  <CalendarArrowDownIcon className="w-4 h-4 mr-2" />
                  {t("date_new_to_old")}
                </span>
              </SelectItem>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="date_old_to_new"
              >
                <span className="flex items-center">
                  <CalendarArrowUpIcon className="w-4 h-4 mr-2" />
                  {t("date_old_to_new")}
                </span>
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="pl-2">{t("sort_by_rating")}:</SelectLabel>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="rate_high_to_low"
              >
                <span className="flex items-center">
                  <ArrowDown01Icon className="w-4 h-4 mr-2" />
                  {t("rate_high_to_low")}
                </span>
              </SelectItem>
              <SelectItem
                showCheck={false}
                className="pl-5 text-muted"
                value="rate_low_to_high"
              >
                <span className="flex items-center">
                  <ArrowUp01Icon className="w-4 h-4 mr-2" />
                  {t("rate_low_to_high")}
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sort;
