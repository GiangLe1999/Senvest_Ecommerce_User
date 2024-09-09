import TermsAndConditionsPageContent from "@/components/pages/delivery-policy-page/delivery-policy-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const TermsAndConditionsPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <TermsAndConditionsPageContent />;
};

export default TermsAndConditionsPage;
