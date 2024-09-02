"use client";

import { Product } from "@/entities/product.entity";
import { FC, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import PriceFilter from "./price-filter";
import AvailabilityFilter from "./availability-filter";
import { formatCurrencyVND } from "@/lib/utils";
import FilterTag from "./filter-tag";
import ScentFilter from "./scent-filter";
import { VariantCount } from "../listing-page-content";
import SaleFilter from "./sale-filter";
import { EraserIcon } from "lucide-react";

interface Props {
  products?: Product[];
  categoryName?: string;
  productVariants?: any[];
  t: any;
  lowestPrice: number;
  highestPrice: number;
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
  inStockCount: number;
  outStockCount: number;
  filterStock: string[];
  setFilterStock: React.Dispatch<React.SetStateAction<string[]>>;
  variantsCount: VariantCount[];
  filterScent: string[];
  setFilterScent: React.Dispatch<React.SetStateAction<string[]>>;
  salesCount: number;
  atFullPriceCount: number;
  filterSales: string[];
  setFilterSales: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters: FC<Props> = ({
  products,
  categoryName,
  productVariants,
  t,
  inStockCount,
  outStockCount,
  lowestPrice,
  highestPrice,
  range,
  setRange,
  filterStock,
  setFilterStock,
  variantsCount,
  filterScent,
  setFilterScent,
  filterSales,
  setFilterSales,
  salesCount,
  atFullPriceCount,
}): JSX.Element => {
  const resetFilter = () => {
    setRange([lowestPrice, highestPrice]);
    setFilterStock([]);
    setFilterScent([]);
    setFilterSales([]);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary mb-2"> {t("filters")}</h2>
      <p className="text-sm text-muted mb-4">
        Show 15 results for “{categoryName}”
      </p>

      <div className="flex flex-wrap text-xs text-muted/80 mb-2 gap-2">
        {/* Filter price tag */}
        {(range[0] !== lowestPrice || range[1] !== highestPrice) && (
          <FilterTag
            content={`${formatCurrencyVND(range[0])} - ${formatCurrencyVND(
              range[1]
            )}`}
            onClick={() => setRange([lowestPrice, highestPrice])}
          />
        )}

        {/* Filter stock tag */}
        {filterStock.length > 0 && (
          <>
            {filterStock.map((value) => (
              <FilterTag
                key={value}
                content={
                  value === "in_stock" ? t("in_stock") : t("out_of_stock")
                }
                onClick={() =>
                  setFilterStock((prev) =>
                    prev.filter((item) => item !== value)
                  )
                }
              />
            ))}
          </>
        )}

        {/* Filter scent tags */}
        {filterScent.length > 0 && (
          <>
            {filterScent.map((value) => (
              <FilterTag
                key={value}
                content={value}
                onClick={() =>
                  setFilterScent((prev) =>
                    prev.filter((item) => item !== value)
                  )
                }
              />
            ))}
          </>
        )}

        {/* Filter stock tag */}
        {filterSales.length > 0 && (
          <>
            {filterSales.map((value) => (
              <FilterTag
                key={value}
                content={
                  value === "on_sale" ? t("on_sale") : t("at_full_price")
                }
                onClick={() =>
                  setFilterSales((prev) =>
                    prev.filter((item) => item !== value)
                  )
                }
              />
            ))}
          </>
        )}
      </div>

      {/* Reset filters */}
      {(range[0] !== lowestPrice ||
        range[1] !== highestPrice ||
        filterStock.length > 0 ||
        filterScent.length > 0 ||
        filterSales.length > 0) && (
        <Button
          className="pl-0 text-foreground underline font-bold mb-6"
          variant="link"
          onClick={resetFilter}
        >
          {t("reset_filters")}
        </Button>
      )}

      <div className="rounded-sm border-t">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["price", "availability", "scent", "sales"]}
        >
          {/* Price filter */}
          <AccordionItem value="price">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              {t("price")}
            </AccordionTrigger>
            <AccordionContent className="pb-8 px-[2px]">
              <PriceFilter t={t} range={range} setRange={setRange} />
            </AccordionContent>
          </AccordionItem>

          {/* Availability filter */}
          <AccordionItem className="hover:no-underline" value="availability">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              {t("availability")}
            </AccordionTrigger>
            <AccordionContent className="pb-6 px-[2px]">
              <AvailabilityFilter
                t={t}
                inStockCount={inStockCount}
                outStockCount={outStockCount}
                filterStock={filterStock}
                setFilterStock={setFilterStock}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="hover:no-underline" value="scent">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              {t("scent")}
            </AccordionTrigger>
            <AccordionContent className="pb-6 px-[2px]">
              <ScentFilter
                t={t}
                variantsCount={variantsCount}
                filterScent={filterScent}
                setFilterScent={setFilterScent}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="hover:no-underline" value="sales">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              {t("sales")}
            </AccordionTrigger>
            <AccordionContent className="pb-6 px-[2px]">
              <SaleFilter
                t={t}
                filterSales={filterSales}
                setFilterSales={setFilterSales}
                salesCount={salesCount}
                atFullPriceCount={atFullPriceCount}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Reset filters */}
        {(range[0] !== lowestPrice ||
          range[1] !== highestPrice ||
          filterStock.length > 0 ||
          filterScent.length > 0 ||
          filterSales.length > 0) && (
          <Button className="mt-6 w-full" onClick={resetFilter}>
            <EraserIcon className="w-4 h-4 mr-2" /> {t("reset_filters")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Filters;
