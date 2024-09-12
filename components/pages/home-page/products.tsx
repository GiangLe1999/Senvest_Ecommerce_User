import { FC } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/entities/product.entity";
import ProductCard from "@/components/product-card";
import SectionContainer from "@/components/section-container";

interface Props {
  products: Product[];
}

const Products: FC<Props> = ({ products }): JSX.Element => {
  const t = useTranslations("home_page.products");

  return (
    <section className="bg-secondary lg:py-[90px] py-[60px]">
      <SectionContainer>
        <h2 className="font-grey_qo lg:text-5xl text-4xl text-primary text-center mb-5">
          {t("sub_heading")}
        </h2>
        <h3 className="lg:text-4xl text-3xl text-center">{t("heading")}</h3>

        <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-[30px] gap-12 mt-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Products;
