"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Product } from "@/entities/product.entity";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import ProductImagesGallery from "./product-images-gallery";
import ProductMainInfo from "./product-main-info";
import { isDiscounted } from "@/lib/utils";
import SalesBadge from "@/components/product-card/sales-badge";
import ProductDescVsReviews from "./product-desc-vs-reviews";

interface Props {
  product: Product;
}

const ProductPageContent: FC<Props> = ({ product }): JSX.Element => {
  const t = useTranslations("product_page");
  const isVi = useLocale() === "vi";

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const activeVariant = product.variants[activeVariantIndex];

  const [shownContent, setShownContent] = useState<"desc" | "reviews">("desc");

  return (
    <>
      <SmallSectionContainer className="mt-12">
        <CustomBreadcrumb
          pages={[
            {
              name: isVi ? product.category.name.vi : product.category.name.en,
              link: isVi
                ? `/danh-muc/${product.category.slug.vi}`
                : `/category/${product.category.slug.en}`,
            },
            {
              name: isVi ? product.name.vi : product.name.en,
              link: isVi
                ? `/san-pham/${product.slug.vi}`
                : `/product/${product.slug.en}`,
            },
          ]}
        />

        <div className="flex gap-10 mt-12">
          <div className="w-[40%] relative">
            {/* Sales badge */}
            {isDiscounted(activeVariant) && (
              <SalesBadge activeVariant={activeVariant} />
            )}
            <ProductImagesGallery
              images={activeVariant.images}
              videos={product?.videos}
            />
          </div>

          <div className="flex-1">
            <ProductMainInfo
              t={t}
              isVi={isVi}
              product={product}
              activeVariant={activeVariant}
              activeVariantIndex={activeVariantIndex}
              setActiveVariantIndex={setActiveVariantIndex}
              shownContent={shownContent}
              setShownContent={setShownContent}
            />
          </div>
        </div>
      </SmallSectionContainer>
      <div className="mt-20 border-t">
        <SmallSectionContainer>
          <ProductDescVsReviews
            t={t}
            isVi={isVi}
            description={product.description}
            product_id={product._id}
            product_name={product.name}
            variants={product.variants}
            shownContent={shownContent}
            setShownContent={setShownContent}
          />
        </SmallSectionContainer>
      </div>
    </>
  );
};

export default ProductPageContent;
