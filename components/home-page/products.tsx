import { FC } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/entities/product.entity";
import SectionContainer from "../section-container";
import ProductCard from "../product-card";

interface Props {
  products: Product[];
}

const Products: FC<Props> = ({ products }): JSX.Element => {
  const t = useTranslations("home_page.products");

  return (
    <section className="bg-secondary py-[90px]">
      <SectionContainer>
        <h2 className="font-grey_qo text-5xl text-primary text-center mb-5">
          {t("sub_heading")}
        </h2>
        <h3 className="text-4xl text-center">{t("heading")}</h3>

        <div className="grid grid-cols-5 gap-[30px] mt-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Products;
