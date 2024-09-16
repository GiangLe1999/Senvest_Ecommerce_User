import OrderHistoryPageContent from "@/components/pages/order-history-page/order-history-page-content";
import { getUserPayments } from "@/queries/user-payment.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Lịch sử mua hàng | Kindle Hope Candles"
      : "Order History | Kindle Hope Candles",
    description: isVi
      ? "Xem lại lịch sử mua hàng của bạn tại Kindle Hope Candles. Theo dõi đơn hàng và kiểm tra tình trạng giao hàng."
      : "Review your purchase history at Kindle Hope Candles. Track orders and check delivery status.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "tai-khoan" : "account"
      }/${isVi ? "lich-su-mua-hang" : "order-history"}`,
    },
  };
}

const OrderHistoryPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  const data = await getUserPayments();
  return <OrderHistoryPageContent payments={data.payments} />;
};

export default OrderHistoryPage;
