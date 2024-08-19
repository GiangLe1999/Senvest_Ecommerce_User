import ProductPageContent from "@/components/pages/product-page/product-page-content";
import { getProductBySlug } from "@/queries/products.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    productSlug: string;
  };
}

const ProductPage: NextPage<Props> = async ({
  params: { locale, productSlug },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { product } = await getProductBySlug(productSlug);

  return <ProductPageContent product={product} />;
};

export default ProductPage;
