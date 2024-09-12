import ListingPageContent from "@/components/pages/listing-page/listing-page-content";
import { getSearchProducts } from "@/queries/products.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    keyword: string;
  };
}

const SearchResultsPage: NextPage<Props> = async ({
  params: { locale, keyword },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { category } = await getSearchProducts(keyword);

  return <ListingPageContent category={category} />;
};

export default SearchResultsPage;
