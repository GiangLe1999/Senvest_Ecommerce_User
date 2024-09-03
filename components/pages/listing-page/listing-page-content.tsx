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

  // Page
  const [page, setPage] = useState(1);

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
  const [filterStock, setFilterStock] = useState<string>("");

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
  const [filterScent, setFilterScent] = useState<string>("");

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
  const [filterSales, setFilterSales] = useState<string>("");

  // For sort filter
  const [sort, setSort] = useState<string>("");

  // Product list
  const initialProducts = [...category?.products!];
  const [renderedProducts, setRenderedProducts] = useState(initialProducts);

  // Check scent condition
  useEffect(() => {
    if (filterScent) {
      setRenderedProducts((prev) => {
        let products = [...prev];
        initialProducts.forEach((product) => {
          const isScentIncluded = product.variants.some((variant: Variant) => {
            return filterScent.includes(variant.fragrance);
          });

          const productIndex = products.findIndex((p) => p._id === product._id);

          if (isScentIncluded) {
            if (productIndex === -1) {
              products.push(product);
            }
          } else {
            if (productIndex !== -1) {
              products = products.filter((p) => p._id !== product._id);
            }
          }
        });

        console.log(products);

        return products;
      });
    }
  }, [filterScent]);

  // Check stock condition
  useEffect(() => {
    if (filterStock) {
      setRenderedProducts((prev) => {
        let products = [...prev];
        initialProducts.forEach((product) => {
          const productIndex = products.findIndex((p) => p._id === product._id);

          if (filterStock === "in_stock") {
            const isInStockIncluded = product.variants.some(
              (variant: Variant) => {
                return variant.stock !== "0";
              }
            );

            if (isInStockIncluded) {
              if (productIndex === -1) {
                products.push(product);
              }
            } else {
              if (productIndex !== -1) {
                products = products.filter((p) => p._id !== product._id);
              }
            }
          }

          if (filterStock === "out_of_stock") {
            const isOutOfStockIncluded = product.variants.every(
              (variant: Variant) => {
                return variant.stock === "0";
              }
            );

            if (isOutOfStockIncluded) {
              if (productIndex === -1) {
                products.push(product);
              }
            } else {
              if (productIndex !== -1) {
                products = products.filter((p) => p._id !== product._id);
              }
            }
          }
        });

        return products;
      });
    }
  }, [filterStock]);

  // Check sale condition
  useEffect(() => {
    if (filterSales) {
      setRenderedProducts((prev) => {
        let products = [...prev];

        initialProducts.forEach((product) => {
          const productIndex = renderedProducts.findIndex(
            (p) => p._id === product._id
          );

          if (filterSales === "on_sale") {
            const isSalesIncluded = product.variants.some(
              (variant: Variant) => {
                return isDiscounted(variant);
              }
            );

            if (isSalesIncluded) {
              if (productIndex === -1) {
                products.push(product);
              }
            } else {
              if (productIndex !== -1) {
                products = products.filter((p) => p._id !== product._id);
              }
            }
          }

          if (filterSales === "at_full_price") {
            const isAtFullPriceIncluded = product.variants.every(
              (variant: Variant) => {
                return !isDiscounted(variant);
              }
            );

            if (isAtFullPriceIncluded) {
              if (productIndex === -1) {
                products.push(product);
              }
            } else {
              if (productIndex !== -1) {
                products = products.filter((p) => p._id !== product._id);
              }
            }
          }
        });

        return products;
      });
    }
  }, [filterSales]);

  useEffect(() => {
    if (!filterStock && !filterScent && !filterSales) {
      setRenderedProducts(initialProducts);
    }
  }, [filterStock, filterScent, filterSales]);

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
            categoryName={isVi ? category?.name.vi : category?.name.en}
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

        <div className="flex-1">
          <h1 className="font-bold text-2xl text-primary mb-2">
            {isVi ? category?.name.vi : category?.name.en}
          </h1>
          <p className="text-sm text-muted mb-4">
            {isVi ? category?.description.vi : category?.description.en}
          </p>

          <div className="border-t mt-6 pt-6" />

          {/* Sort */}
          <Sort setSort={setSort} t={t} sort={sort} />

          {/* Product list */}
          <ProductList renderProducts={renderedProducts} />

          {/* Pagination */}
          <div className="mt-8">
            <PaginationWithLinks
              page={page}
              pageSize={10}
              setPage={setPage}
              totalCount={500}
            />
          </div>
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default ListingPageContent;
