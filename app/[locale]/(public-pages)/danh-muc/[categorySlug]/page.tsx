import ListingPageContent from "@/components/pages/listing-page/listing-page-content";
import { getCategoryProducts } from "@/queries/categories.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    categorySlug: string;
  };
}

const CategoryPage: NextPage<Props> = async ({
  params: { locale, categorySlug },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { category } = await getCategoryProducts(categorySlug);

  return <ListingPageContent category={category} />;
};

export default CategoryPage;
