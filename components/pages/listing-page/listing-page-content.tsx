"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Category } from "@/entities/category.entity";
import { useLocale, useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import Filters from "./filters";
import { getPriceForVariant, isDiscounted } from "@/lib/utils";
import ProductList from "./product-list";
import Sort from "./sort";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { Variant } from "@/entities/variant.entity";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EraserIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  category?: Category;
}

export interface VariantCount {
  scent: string;
  count: number;
}

const LIMIT = 6;

const ListingPageContent: FC<Props> = ({ category }): JSX.Element => {
  const searchParams = useSearchParams();
  const scent = searchParams.get("scent");

  const t = useTranslations("listing_page");
  const isVi = useLocale() === "vi";

  const productVariants = category?.products
    ?.map((product) => product.variants)
    .flat();

  const [page, setPage] = useState(1);

  // Price range
  const variantsPrice = productVariants?.map((variant) =>
    parseFloat(getPriceForVariant(variant))
  );
  const lowestPrice = Math.min(...variantsPrice!);
  const highestPrice = Math.max(...variantsPrice!);
  const [range, setRange] = useState([lowestPrice, highestPrice]);

  // Availability filter
  const outStockCount =
    category?.products?.filter((product) =>
      product.variants.every((variant: Variant) => variant.stock === "0")
    ).length || 0;
  const inStockCount = (category?.products?.length || 0) - outStockCount;
  const [filterStock, setFilterStock] = useState<string>("");

  // Scent filter
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
  const [filterScent, setFilterScent] = useState<string>(scent ? scent : "");

  // Sales filter
  const salesCount =
    category?.products?.filter((product) =>
      product.variants.some((variant: Variant) => isDiscounted(variant))
    ).length || 0;
  const atFullPriceCount = (category?.products?.length || 0) - salesCount;
  const [filterSales, setFilterSales] = useState<string>("");

  // Sort filter
  const [sort, setSort] = useState<string>("");

  // Product list
  const [renderedProducts, setRenderedProducts] = useState([
    ...category?.products!,
  ]);

  const [productsCount, setProductsCount] = useState(0);

  const resetFilter = () => {
    setRange([lowestPrice, highestPrice]);
    setFilterStock("");
    setFilterScent("");
    setFilterSales("");
    setSort("");
    setPage(1);
  };

  useEffect(() => {
    // Reset page to 1 when a filter changes
    setPage(1);
  }, [filterScent, filterStock, filterSales, range, sort]);

  useEffect(() => {
    let filteredProducts = [...category?.products!];

    // Apply scent filter
    if (filterScent) {
      filteredProducts = filteredProducts.filter((product) =>
        product.variants.some(
          (variant: Variant) => variant.fragrance === filterScent
        )
      );
    }

    // Apply stock filter
    if (filterStock) {
      if (filterStock === "in_stock") {
        filteredProducts = filteredProducts.filter((product) =>
          product.variants.some((variant: Variant) => variant.stock !== "0")
        );
      } else if (filterStock === "out_of_stock") {
        filteredProducts = filteredProducts.filter((product) =>
          product.variants.every((variant: Variant) => variant.stock === "0")
        );
      }
    }

    // Apply sales filter
    if (filterSales) {
      if (filterSales === "on_sale") {
        filteredProducts = filteredProducts.filter((product) =>
          product.variants.some((variant: Variant) => isDiscounted(variant))
        );
      } else if (filterSales === "at_full_price") {
        filteredProducts = filteredProducts.filter((product) =>
          product.variants.every((variant: Variant) => !isDiscounted(variant))
        );
      }
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter((product) =>
      product.variants.some((variant: Variant) => {
        const price = parseFloat(getPriceForVariant(variant));
        return price >= range[0] && price <= range[1];
      })
    );

    // Apply sort filter
    if (sort) {
      if (sort === "best_selling") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const soldA = a.totalQuantitySold;
          const soldB = b.totalQuantitySold;
          return soldB - soldA;
        });
      } else if (sort === "a_to_z") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const nameA = isVi
            ? a.name.vi.toUpperCase()
            : a.name.en.toUpperCase();
          const nameB = isVi
            ? b.name.vi.toUpperCase()
            : b.name.en.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (sort === "z_to_a") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const nameA = isVi
            ? a.name.vi.toUpperCase()
            : a.name.en.toUpperCase();
          const nameB = isVi
            ? b.name.vi.toUpperCase()
            : b.name.en.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      } else if (sort === "price_low_to_high") {
        filteredProducts = filteredProducts.sort((a, b) => {
          let aIndex = 0;
          a.variants.forEach((v: Variant, index: number) => {
            if (
              getPriceForVariant(v) < getPriceForVariant(a.variants[aIndex])
            ) {
              aIndex = index;
            }
          });

          let bIndex = 0;
          b.variants.forEach((v: Variant, index: number) => {
            if (
              getPriceForVariant(v) < getPriceForVariant(b.variants[bIndex])
            ) {
              bIndex = index;
            }
          });

          const priceA = parseFloat(getPriceForVariant(a.variants[aIndex]));
          const priceB = parseFloat(getPriceForVariant(b.variants[bIndex]));
          return priceA - priceB;
        });
      } else if (sort === "price_high_to_low") {
        filteredProducts = filteredProducts.sort((a, b) => {
          let aIndex = 0;
          a.variants.forEach((v: Variant, index: number) => {
            if (
              getPriceForVariant(v) < getPriceForVariant(a.variants[aIndex])
            ) {
              aIndex = index;
            }
          });

          let bIndex = 0;
          b.variants.forEach((v: Variant, index: number) => {
            if (
              getPriceForVariant(v) < getPriceForVariant(b.variants[bIndex])
            ) {
              bIndex = index;
            }
          });

          const priceA = parseFloat(getPriceForVariant(a.variants[aIndex]));
          const priceB = parseFloat(getPriceForVariant(b.variants[bIndex]));
          return priceB - priceA;
        });
      } else if (sort === "date_new_to_old") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
      } else if (sort === "date_old_to_new") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });
      } else if (sort === "rate_high_to_low") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const rateA = parseFloat(a.rating);
          const rateB = parseFloat(b.rating);
          return rateB - rateA;
        });
      } else if (sort === "rate_low_to_high") {
        filteredProducts = filteredProducts.sort((a, b) => {
          const rateA = parseFloat(a.rating);
          const rateB = parseFloat(b.rating);
          return rateA - rateB;
        });
      }
    }

    setRenderedProducts(
      filteredProducts.slice((page - 1) * LIMIT, page * LIMIT)
    );
    setProductsCount(filteredProducts.length);
  }, [
    filterScent,
    filterStock,
    filterSales,
    range,
    category?.products,
    sort,
    page,
    isVi,
  ]);

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
      ) : null}

      <div className="flex gap-16">
        <div className="w-[25%] lg:block hidden">
          <Filters
            categoryName={isVi ? category?.name.vi : category?.name.en}
            t={t}
            // Price filter
            lowestPrice={lowestPrice}
            highestPrice={highestPrice}
            range={range}
            setRange={setRange}
            // Availability filter
            inStockCount={inStockCount}
            outStockCount={outStockCount}
            filterStock={filterStock}
            setFilterStock={setFilterStock}
            // Scent filter
            variantsCount={variantsCount}
            filterScent={filterScent}
            setFilterScent={setFilterScent}
            // Sales filter
            salesCount={salesCount}
            atFullPriceCount={atFullPriceCount}
            filterSales={filterSales}
            setFilterSales={setFilterSales}
            productsCount={productsCount}
            // Reset filter
            resetFilter={resetFilter}
          />
        </div>

        <div className="flex-1">
          <h1 className="font-bold text-2xl text-primary mb-2">
            {isVi ? category?.name.vi : category?.name.en}
          </h1>
          <p className="text-sm text-muted mb-4 line-clamp-1">
            {isVi ? category?.description.vi : category?.description.en}
          </p>

          <div className="border-t mt-6 pt-6" />

          {/* Mobile Filter */}
          <Dialog>
            <div className="flex items-center flex-wrap gap-5 mb-6 lg:hidden">
              <DialogTrigger asChild>
                <div className="flex flex-wrap items-center gap-5">
                  <span className="font-bold shrink-0">
                    {t("open_filters")}:
                  </span>{" "}
                  <Button variant="secondary">
                    {t("click_to_open")}{" "}
                    <SquareArrowOutUpRightIcon className="w-[14px] h-[14px] ml-2" />
                  </Button>
                </div>
              </DialogTrigger>

              {filterScent ||
              filterStock ||
              filterSales ||
              sort ||
              range[0] !== lowestPrice ||
              range[1] !== highestPrice ? (
                <Button variant="destructive" onClick={resetFilter}>
                  {t("reset_filters")} <EraserIcon className="w-4 h-4 ml-2" />
                </Button>
              ) : null}
            </div>
            <DialogContent className="mt-[65px] h-[calc(100vh_-_128px)]">
              <ScrollArea className="pr-4">
                <Filters
                  categoryName={isVi ? category?.name.vi : category?.name.en}
                  t={t}
                  // Price filter
                  lowestPrice={lowestPrice}
                  highestPrice={highestPrice}
                  range={range}
                  setRange={setRange}
                  // Availability filter
                  inStockCount={inStockCount}
                  outStockCount={outStockCount}
                  filterStock={filterStock}
                  setFilterStock={setFilterStock}
                  // Scent filter
                  variantsCount={variantsCount}
                  filterScent={filterScent}
                  setFilterScent={setFilterScent}
                  // Sales filter
                  salesCount={salesCount}
                  atFullPriceCount={atFullPriceCount}
                  filterSales={filterSales}
                  setFilterSales={setFilterSales}
                  productsCount={productsCount}
                  // Reset filter
                  resetFilter={resetFilter}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Sort */}
          <Sort setSort={setSort} t={t} sort={sort} />

          {/* Product list */}
          <ProductList renderProducts={renderedProducts} />

          {/* Pagination */}
          <div className="mt-12">
            {category?.products && category.products.length > 0 && (
              <PaginationWithLinks
                page={page}
                pageSize={6}
                setPage={setPage}
                totalCount={productsCount}
              />
            )}
          </div>
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default ListingPageContent;
