import CheckoutPageContent from "@/components/pages/checkout-page/checkout-page-content";
import { authOptions } from "@/lib/auth";
import { getUserAddresses } from "@/queries/user-addresses.queries";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";
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
      ? "Hoàn Tất Đơn Hàng | Kindle Hope Candles"
      : "Complete Your Purchase | Kindle Hope Candles",
    description: isVi
      ? "Thanh toán an toàn và mang những ngọn nến yêu thích về nhà. Thắp sáng không gian của bạn bằng hy vọng và ấm áp!"
      : "Securely checkout and bring home your favorite candles. Light up your space with hope and warmth!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "thanh-toan" : "checkout"
      }`,
    },
  };
}

const CheckoutPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const session = await getServerSession(authOptions);
  const userAddresses = session ? await getUserAddresses() : null;

  return (
    <CheckoutPageContent
      session={session}
      userAdddresses={userAddresses?.data ?? null}
    />
  );
};

export default CheckoutPage;
