import ProductPageContent from "@/components/pages/product-page/product-page-content";
import { Product } from "@/entities/product.entity";
import { getAllProducts, getProductBySlug } from "@/queries/products.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    productSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";
  const { product } = await getProductBySlug(params.productSlug);

  return {
    title: isVi
      ? `${product.name.vi} | Kindle Hope Candles`
      : `${product.name.en}| Kindle Hope Candles`,
    description: isVi
      ? `${product.description.vi.slice(0, 150)}`
      : `${product.description.en.slice(0, 150)}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "san-pham" : "product"
      }/${isVi ? product.slug.vi : product.slug.en}`,
    },
  };
}

export async function generateStaticParams() {
  const {
    category: { products },
  } = await getAllProducts();

  const viParams = products.map((product: Product) => ({
    locale: "vi",
    productSlug: product.slug.vi,
  })) as { locale: string; productSlug: string }[];

  const enParams = products.map((product: Product) => ({
    locale: "en",
    productSlug: product.slug.en,
  })) as { locale: string; productSlug: string }[];

  // Test
  return [...viParams, ...enParams];
}

const ProductPage: NextPage<Props> = async ({
  params: { locale, productSlug },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { product } = await getProductBySlug(productSlug);

  return <ProductPageContent product={product} />;
};

export default ProductPage;
