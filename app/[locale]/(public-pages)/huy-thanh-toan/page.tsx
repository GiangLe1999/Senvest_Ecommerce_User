import { cancelPaymentLink } from "@/actions/payment.actions";
import CancelPayment from "@/components/pages/cancel-payment-page/cancel-payment";
import { redirect } from "@/configs/i18n-navigation";
import { Metadata, NextPage } from "next";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Hủy thanh toán đơn hàng | Kindle Hope Candles"
      : "Cancel Order Payment | Kindle Hope Candles",
    description: isVi
      ? "Bạn đã hủy thanh toán đơn hàng, hy vọng sẽ sớm được phục vụ bạn trong lần tới."
      : "You have canceled your order payment. We hope to serve you again soon.",
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
