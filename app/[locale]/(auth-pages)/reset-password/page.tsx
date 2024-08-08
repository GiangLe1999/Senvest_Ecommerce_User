import ResetPasswordPageContent from "@/components/pages/reset-password-page/reset-password-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    token: string;
  };
}

const ResetPasswordPage: NextPage<Props> = ({
  params: { locale },
  searchParams,
}: Props) => {
  unstable_setRequestLocale(locale);
  const token = searchParams.token;

  return <ResetPasswordPageContent token={token} />;
};

export default ResetPasswordPage;
