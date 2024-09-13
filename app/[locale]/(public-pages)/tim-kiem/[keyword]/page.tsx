import ListingPageContent from "@/components/pages/listing-page/listing-page-content";
import { getSearchProducts } from "@/queries/products.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    keyword: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? `Kết Quả Tìm Kiếm Cho “${params.keyword}” | Kindle Hope Candles`
      : `Search Results for “${params.keyword}” | Kindle Hope Candles`,
    description: isVi
      ? "Tìm những ngọn nến phù hợp với tìm kiếm của bạn. Khám phá nến hoàn hảo để thắp sáng ngày mới cùng Kindle Hope Candles."
      : "Discover candles that match your search. Find the perfect candle to brighten your day with Kindle Hope Candles.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "tim-kiem" : "search"
      }/${params.keyword}`,
    },
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
