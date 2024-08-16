import FailedPayment from "@/components/pages/thank-you-page/failed-payment";
import PendingPayment from "@/components/pages/thank-you-page/pending-payment";
import ThankYouPageContent from "@/components/pages/thank-you-page/thank-you-page-content";
import { redirect } from "@/configs/i18n-navigation";
import { StatusEnum } from "@/entities/payment.entity";
import { getPayment } from "@/queries/payment.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    orderCode: string;
  };
}

const CheckoutPage: NextPage<Props> = async ({
  params: { locale },
  searchParams: { orderCode },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { data } = await getPayment({ orderCode });

  if (!data) {
    return redirect("/");
  }

  if (data.status === StatusEnum.paid) {
    return <ThankYouPageContent />;
  }

  if (data.status === StatusEnum.cancelled) {
    return <FailedPayment />;
  }

  return <PendingPayment />;
};

export default CheckoutPage;
