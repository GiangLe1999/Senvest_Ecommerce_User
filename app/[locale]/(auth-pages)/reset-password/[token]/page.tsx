import ResetPasswordPageContent from "@/components/pages/reset-password-page/reset-password-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    token: string;
  };
}

const ResetPasswordPage: NextPage<Props> = ({
  params: { locale, token },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <ResetPasswordPageContent token={token} />;
};

export default ResetPasswordPage;
