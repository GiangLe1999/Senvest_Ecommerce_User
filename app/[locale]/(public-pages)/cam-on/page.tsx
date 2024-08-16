import ThankYouPageContent from "@/components/pages/thank-you-page/thank-you-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const CheckoutPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <ThankYouPageContent />;
};

export default CheckoutPage;
