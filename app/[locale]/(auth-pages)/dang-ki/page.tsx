import RegisterPageContent from "@/components/pages/register-page/register-page-content";
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
      ? "Đăng Ký Thành Viên | Kindle Hope Candles"
      : "Join Membership | Kindle Hope Candles",
    description: isVi
      ? "Tham gia thành viên để nhận ưu đãi độc quyền, cập nhật sản phẩm mới và tận hưởng trải nghiệm nến thơm tuyệt vời!"
      : "Sign up to unlock exclusive offers, stay updated on new arrivals, and enjoy a premium candle experience!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "dang-ki" : "register"
      }`,
    },
  };
}

const RegisterPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <RegisterPageContent />;
};

export default RegisterPage;
