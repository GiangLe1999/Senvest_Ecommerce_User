import TermsAndConditionsPageContent from "@/components/pages/terms-and-conditions-page/terms-and-conditions-page-content";
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
