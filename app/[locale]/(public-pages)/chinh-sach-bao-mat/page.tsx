import PrivacyPolicyPageContent from "@/components/pages/privacy-policy-page/privacy-policy-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const PrivacyPolicyPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <PrivacyPolicyPageContent />;
};

export default PrivacyPolicyPage;
