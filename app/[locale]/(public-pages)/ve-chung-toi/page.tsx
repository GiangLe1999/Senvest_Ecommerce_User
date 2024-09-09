import AboutUsPageContent from "@/components/pages/about-us-page/about-us-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const AboutUsPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <AboutUsPageContent />;
};

export default AboutUsPage;
