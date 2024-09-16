import OrderHistoryDetailsPageContent from "@/components/pages/order-history-details-page/order-history-details-page-content";
import { getUserPaymentByOrderCode } from "@/queries/user-payment.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    paymentCode: string;
  };
}

export async function generateOrderDetailMetadata({
  params,
}: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";
  const paymentCode = params.paymentCode;

  return {
    title: isVi
      ? `Chi tiết đơn hàng #${paymentCode} | Kindle Hope Candles`
      : `Order Details #${paymentCode} | Kindle Hope Candles`,
    description: isVi
      ? `Xem lại chi tiết đơn hàng #${paymentCode} của bạn tại Kindle Hope Candles. Kiểm tra tình trạng giao hàng và theo dõi đơn hàng của bạn.`
      : `Review your order details for #${paymentCode} at Kindle Hope Candles. Check delivery status and track your order.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "tai-khoan" : "account"
      }/${isVi ? "lich-su-mua-hang" : "order-history"}/${paymentCode}`,
    },
  };
}

const OrderHistoryDetailsPage: NextPage<Props> = async ({
  params: { locale, paymentCode },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { order } = await getUserPaymentByOrderCode(paymentCode);
  return <OrderHistoryDetailsPageContent payment={order} />;
};

export default OrderHistoryDetailsPage;
