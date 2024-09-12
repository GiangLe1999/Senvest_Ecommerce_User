import ResetPasswordPageContent from "@/components/pages/reset-password-page/reset-password-page-content";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    token: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Đặt Lại Mật Khẩu | Kindle Hope Candles"
      : "Reset Password | Kindle Hope Candles",
    description: isVi
      ? "Tạo mật khẩu mới để bảo vệ tài khoản và tiếp tục khám phá các sản phẩm nến thơm tuyệt vời!"
      : "Set a new password to secure your account and continue exploring our wonderful candle collection!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/reset-password`,
    },
  };
}

const ResetPasswordPage: NextPage<Props> = ({
  params: { locale, token },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <ResetPasswordPageContent token={token} />;
};

export default ResetPasswordPage;
