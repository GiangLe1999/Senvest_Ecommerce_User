import ListingPageContent from "@/components/pages/listing-page/listing-page-content";
import { Category } from "@/entities/category.entity";
import {
  getCategoriesForNavigation,
  getCategoryProducts,
} from "@/queries/categories.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    categorySlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";
  const { category } = await getCategoryProducts(params.categorySlug);

  return {
    title: isVi
      ? `Nến thơm thuộc danh mục ${category.name.vi} | Kindle Hope Candles`
      : `Candles in the ${category.name.en} Category | Kindle Hope Candles`,
    description: isVi
      ? `Khám phá các sản phẩm nến thơm từ danh mục ${category.name.vi}, lan tỏa hương thơm yêu thích của bạn!`
      : `Explore scented candles from the ${category.name.en} category, and spread your favorite fragrance!`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "danh-muc" : "category"
      }/${isVi ? category.slug.vi : category.slug.en}`,
    },
  };
}

export async function generateStaticParams() {
  const data = (await getCategoriesForNavigation()) as any;

  const viParams = data.categories.map((category: Category) => ({
    locale: "vi",
    categorySlug: category.slug.vi,
  })) as { locale: string; categorySlug: string }[];

  const enParams = data.categories.map((category: Category) => ({
    locale: "en",
    categorySlug: category.slug.en,
  })) as { locale: string; categorySlug: string }[];

  return [...viParams, ...enParams];
}

const CategoryPage: NextPage<Props> = async ({
  params: { locale, categorySlug },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { category } = await getCategoryProducts(categorySlug);

  return <ListingPageContent category={category} />;
};

export default CategoryPage;
