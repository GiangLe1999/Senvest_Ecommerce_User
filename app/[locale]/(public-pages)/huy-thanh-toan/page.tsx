import { cancelPaymentLink } from "@/actions/payment.actions";
import CancelPayment from "@/components/pages/cancel-payment-page/cancel-payment";
import { redirect } from "@/configs/i18n-navigation";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    orderCode: string;
    status: string;
  };
}

const CancelPaymentPage: NextPage<Props> = async ({
  params: { locale },
  searchParams: { orderCode, status },
}: Props) => {
  unstable_setRequestLocale(locale);

  if (!orderCode && status !== "CANCELLED") {
    return redirect("/");
  }

  await cancelPaymentLink({ orderCode });

  return <CancelPayment />;
};

export default CancelPaymentPage;
