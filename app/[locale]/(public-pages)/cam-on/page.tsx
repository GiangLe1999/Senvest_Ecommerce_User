import FailedPayment from "@/components/pages/thank-you-page/failed-payment";
import PendingPayment from "@/components/pages/thank-you-page/pending-payment";
import ThankYouPageContent from "@/components/pages/thank-you-page/thank-you-page-content";
import { redirect } from "@/configs/i18n-navigation";
import { StatusEnum } from "@/entities/payment.entity";
import { getPayment } from "@/queries/payment.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    orderCode: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Cảm ơn bạn đã đặt hàng | Kindle Hope Candles"
      : "Thank You for Your Order | Kindle Hope Candles",
    description: isVi
      ? "Cảm ơn bạn! Đơn hàng đã xác nhận. Nến sẽ sớm đến tay bạn!"
      : "Thank you! Your order is confirmed. Your candles will be on their way soon!",
  };
}

const ThankyouPage: NextPage<Props> = async ({
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

export default ThankyouPage;
