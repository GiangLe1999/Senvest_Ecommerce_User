import DonatePageContent from "@/components/pages/donate-page/donate-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const DonatePage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <DonatePageContent />;
};

export default DonatePage;
