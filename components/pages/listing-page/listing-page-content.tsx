"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Category } from "@/entities/category.entity";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import Filters from "./filters";
import { getPriceForVariant, isDiscounted } from "@/lib/utils";

interface Props {
  category?: Category;
}

export interface VariantCount {
  scent: string;
  count: number;
}

const ListingPageContent: FC<Props> = ({ category }): JSX.Element => {
  const t = useTranslations("listing_page");
  const isVi = useLocale() === "vi";

  const productVariants = category?.products
    ?.map((product) => {
      return product.variants;
    })
    .flat();

  // For price filter
  const variantsPrice = productVariants?.map((variant) => {
    const variantPrice = parseFloat(getPriceForVariant(variant));
    return variantPrice;
  });
  const lowestPrice = Math.min(...variantsPrice!);
  const highestPrice = Math.max(...variantsPrice!);
  const [range, setRange] = useState([lowestPrice, highestPrice]);

  // For availability filter
  const outStockCount =
    category?.products?.filter((product) => {
      for (const variant of product.variants) {
        if (variant.quantity === "0") {
          return true;
        } else {
          return false;
        }
      }
    })?.length || 0;
  const inStockCount = (category?.products?.length || 0) - (outStockCount || 0);
  const [filterStock, setFilterStock] = useState<string[]>([]);

  // For scent filter
  const variantsCount: VariantCount[] = [];
  productVariants?.forEach((variant) => {
    const variantScentIndex = variantsCount.findIndex(
      (v) => v.scent === variant.fragrance
    );

    if (variantScentIndex === -1) {
      variantsCount.push({ scent: variant.fragrance, count: 1 });
    } else {
      variantsCount[variantScentIndex].count += 1;
    }
  });
  const [filterScent, setFilterScent] = useState<string[]>([]);

  // For sales filter
  const salesCount =
    category?.products?.filter((product) => {
      for (const variant of product.variants) {
        if (isDiscounted(variant)) {
          return true;
        } else {
          return false;
        }
      }
    })?.length || 0;
  const atFullPriceCount =
    (category?.products?.length || 0) - (salesCount || 0);
  const [filterSales, setFilterSales] = useState<string[]>([]);

  return (
    <SmallSectionContainer className="mt-12">
      {category ? (
        <CustomBreadcrumb
          pages={[
            {
              name: isVi ? category.name.vi : category.name.en,
              link: "",
            },
          ]}
        />
      ) : (
        <></>
      )}

      <div className="flex gap-16">
        <div className="w-[25%]">
          <Filters
            products={category?.products}
            categoryName={isVi ? category?.name.vi : category?.name.en}
            productVariants={productVariants}
            t={t}
            // For price filter
            lowestPrice={lowestPrice}
            highestPrice={highestPrice}
            range={range}
            setRange={setRange}
            // For availability filter
            inStockCount={inStockCount}
            outStockCount={outStockCount}
            filterStock={filterStock}
            setFilterStock={setFilterStock}
            // For scent filter
            variantsCount={variantsCount}
            filterScent={filterScent}
            setFilterScent={setFilterScent}
            // For sales filter
            salesCount={salesCount}
            atFullPriceCount={atFullPriceCount}
            filterSales={filterSales}
            setFilterSales={setFilterSales}
          />
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default ListingPageContent;
