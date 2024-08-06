import LoginForm from "@/components/pages/login-page/login-form";
import SectionContainer from "@/components/section-container";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const LoginPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <SectionContainer>
      <LoginForm />
    </SectionContainer>
  );
};

export default LoginPage;
