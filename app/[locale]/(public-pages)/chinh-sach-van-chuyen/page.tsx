import DeliveryPolicyPageContent from "@/components/pages/delivery-policy-page/delivery-policy-page-content";
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
      ? "Chính sách vận chuyển | Kindle Hope Candles"
      : "Shipping Policy | Kindle Hope Candles",
    description: isVi
      ? "Chúng tôi đảm bảo giao hàng nhanh chóng và an toàn đến tay bạn."
      : "We ensure fast and safe delivery to your doorstep.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "chinh-sach-van-chuyen" : "delivery-policy"
      }`,
    },
  };
}

const DeliveryPolicyPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <DeliveryPolicyPageContent />;
};

export default DeliveryPolicyPage;
