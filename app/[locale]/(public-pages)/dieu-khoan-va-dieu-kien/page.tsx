import TermsAndConditionsPageContent from "@/components/pages/terms-and-conditions-page/terms-and-conditions-page-content";
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
      ? "Điều khoản và Điều kiện | Kindle Hope Candles"
      : "Terms and Conditions | Kindle Hope Candles",
    description: isVi
      ? "Tìm hiểu về các điều khoản khi sử dụng dịch vụ của chúng tôi."
      : "Learn about the terms and conditions of using our services.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "dieu-kien-va-dieu-kien" : "terms-and-conditions"
      }`,
    },
  };
}

const TermsAndConditionsPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <TermsAndConditionsPageContent />;
};

export default TermsAndConditionsPage;
