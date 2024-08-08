import RegisterPageContent from "@/components/pages/register-page/register-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const RegisterPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <RegisterPageContent />;
};

export default RegisterPage;
