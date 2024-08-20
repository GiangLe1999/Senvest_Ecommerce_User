import ComparisonPageContent from "@/components/pages/comparison-page/comparison-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const ComparisonPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <ComparisonPageContent />;
};

export default ComparisonPage;
