import PrivacyPolicyPageContent from "@/components/pages/privacy-policy-page/privacy-policy-page-content";
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
      ? "Chính sách bảo mật | Kindle Hope Candles"
      : "Privacy Policy | Kindle Hope Candles",
    description: isVi
      ? "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn một cách an toàn và bảo mật."
      : "We are committed to protecting your personal information safely and securely.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "chinh-sach-bao-mat" : "privacy-policy"
      }`,
    },
  };
}

const PrivacyPolicyPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <PrivacyPolicyPageContent />;
};

export default PrivacyPolicyPage;
