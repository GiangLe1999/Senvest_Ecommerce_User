import ComparisonPageContent from "@/components/pages/comparison-page/comparison-page-content";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "So sánh sản phẩm | Kindle Hope Candles"
      : "Compare products | Kindle Hope Candles",
    description: isVi
      ? "So sánh các dòng nến thơm của chúng tôi để tìm ra hương thơm hoàn hảo cho không gian của bạn."
      : "Compare our wide range of scented candles to find the perfect fragrance for your space.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "so-sanh" : "compare"
      }`,
    },
  };
}

const ComparisonPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <ComparisonPageContent />;
};

export default ComparisonPage;
