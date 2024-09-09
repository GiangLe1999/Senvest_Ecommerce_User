import DeliveryPolicyPageContent from "@/components/pages/delivery-policy-page/delivery-policy-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const DeliveryPolicyPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <DeliveryPolicyPageContent />;
};

export default DeliveryPolicyPage;
