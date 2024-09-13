import AboutUsPageContent from "@/components/pages/about-us-page/about-us-page-content";
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
      ? "Về Chúng Tôi | Kindle Hope Candles"
      : "About Us | Kindle Hope Candles",
    description: isVi
      ? "Tìm hiểu niềm đam mê của chúng tôi trong việc tạo ra những ngọn nến mang hy vọng và ấm áp. Khám phá hành trình của Kindle Hope Candles."
      : "Learn about our passion for creating candles that inspire hope and warmth. Explore our journey at Kindle Hope Candles.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "thanh-toan" : "checkout"
      }`,
    },
  };
}

const AboutUsPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <AboutUsPageContent />;
};

export default AboutUsPage;
