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
import { useTranslations } from "next-intl";
import PriceFilter from "./price-filter";
import AvailabilityFilter from "./availability-filter";

interface Props {
  products?: Product[];
  categoryName?: string;
  lowestPrice?: number;
  highestPrice?: number;
  inStockCount: number;
  outStockCount: number;
}

const Filters: FC<Props> = ({
  products,
  categoryName,
  lowestPrice,
  highestPrice,
  inStockCount,
  outStockCount,
}): JSX.Element => {
  const [range, setRange] = useState([lowestPrice, highestPrice]);
  const t = useTranslations("listing_page");

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary mb-2"> {t("filters")}</h2>
      <p className="text-sm text-muted">Show 15 results for “{categoryName}”</p>

      <Button
        className="pl-0 text-foreground underline font-bold"
        variant="link"
      >
        {t("reset_filters")}
      </Button>

      <div className="mt-6 rounded-sm border-t">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["price", "availability", "scent", "sales"]}
        >
          <AccordionItem value="price">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              {t("price")}
            </AccordionTrigger>
            <AccordionContent className="pb-8 px-[2px]">
              <PriceFilter t={t} range={range} setRange={setRange} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="hover:no-underline" value="availability">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              {t("availability")}
            </AccordionTrigger>
            <AccordionContent className="pb-6 px-[2px]">
              <AvailabilityFilter
                t={t}
                inStockCount={inStockCount}
                outStockCount={outStockCount}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="hover:no-underline" value="scent">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="hover:no-underline" value="sales">
            <AccordionTrigger className="hover:no-underline px-[2px] font-bold">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
