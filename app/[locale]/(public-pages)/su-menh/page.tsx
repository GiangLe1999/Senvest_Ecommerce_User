import MissionPageContent from "@/components/pages/mission-page/mission-page-content";
import { getThreeLatestArticles } from "@/queries/articles.queries";
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
      ? "Sứ mệnh & Ảnh hưởng | Kindle Hope Candles"
      : "Mission & Impact | Kindle Hope Candles",
    description: isVi
      ? "Tìm hiểu về sứ mệnh của Kindle Hope Candles và những tác động tích cực mà chúng tôi mang lại cho cộng đồng."
      : "Learn about Kindle Hope Candles' mission and the positive impact we bring to the community.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "su-menh" : "mission"
      }`,
    },
  };
}

const MissionPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const articles = (await getThreeLatestArticles()) as any[];

  return <MissionPageContent articles={articles} />;
};

export default MissionPage;
