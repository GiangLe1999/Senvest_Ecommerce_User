import PaymentMethodsPageContent from "@/components/pages/payment-methods-page/payment-methods-page-content";
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
      ? "Phương thức thanh toán | Kindle Hope Candles"
      : "Payment Methods | Kindle Hope Candles",
    description: isVi
      ? "Tìm hiểu về các phương thức thanh toán an toàn và tiện lợi mà chúng tôi cung cấp."
      : "Learn about the secure and convenient payment methods we offer.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "phuong-thuc-thanh-toan" : "payment-methods"
      }`,
    },
  };
}

const PaymentMethodsPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <PaymentMethodsPageContent />;
};

export default PaymentMethodsPage;
