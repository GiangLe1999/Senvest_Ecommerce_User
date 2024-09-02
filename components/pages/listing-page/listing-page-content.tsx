import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Category } from "@/entities/category.entity";
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";
import Filters from "./filters";
import { getPriceForVariant } from "@/lib/utils";

interface Props {
  category?: Category;
}

const ListingPageContent: FC<Props> = ({ category }): JSX.Element => {
  const t = useTranslations("listing_page");
  const isVi = useLocale() === "vi";

  const productVariants = category?.products
    ?.map((product) => {
      return product.variants;
    })
    .flat();

  const variantsPrice = productVariants?.map((variant) => {
    const variantPrice = parseFloat(getPriceForVariant(variant));
    return variantPrice;
  });

  const lowestPrice = Math.min(...variantsPrice!);
  const highestPrice = Math.max(...variantsPrice!);

  const outStockCount =
    productVariants?.filter((variant) => {
      return variant === "0";
    }).length || 0;

  const inStockCount = productVariants?.length || 0 - (outStockCount || 0);

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
        <div className="w-[30%]">
          <Filters
            products={category?.products}
            categoryName={isVi ? category?.name.vi : category?.name.en}
            lowestPrice={lowestPrice}
            highestPrice={highestPrice}
            inStockCount={inStockCount}
            outStockCount={outStockCount}
          />
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default ListingPageContent;
