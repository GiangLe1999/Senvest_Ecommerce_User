import ForgotPasswordPageContent from "@/components/pages/forgot-password-page/forgot-password-page-content";
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
      ? "Quên Mật Khẩu | Kindle Hope Candles"
      : "Forgot Password | Kindle Hope Candles",
    description: isVi
      ? "Đăng nhập để khám phá bộ sưu tập nến thơm và trải nghiệm các ưu đãi đặc biệt dành riêng cho bạn!"
      : "Log in to explore our candle collection and enjoy exclusive offers made just for you!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/${
        isVi ? "quen-mat-khau" : "forgot-password"
      }`,
    },
  };
}

const ForgotPasswordPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <ForgotPasswordPageContent />;
};

export default ForgotPasswordPage;
