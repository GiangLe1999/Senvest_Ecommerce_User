import ForgotPasswordPageContent from "@/components/pages/forgot-password-page/forgot-password-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const ForgotPasswordPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <ForgotPasswordPageContent />;
};

export default ForgotPasswordPage;
