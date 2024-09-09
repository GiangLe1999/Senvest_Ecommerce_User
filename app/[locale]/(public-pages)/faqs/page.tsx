import FAQPageContent from "@/components/pages/privacy-policy-page/privacy-policy-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const FAQPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <FAQPageContent />;
};

export default FAQPage;
