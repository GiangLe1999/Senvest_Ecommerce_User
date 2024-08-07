import CustomBreadcrumb from "@/components/custom-breadcrumb";
import LoginForm from "@/components/pages/login-page/login-form";
import SectionContainer from "@/components/section-container";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const LoginPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("login_page");

  return (
    <SectionContainer>
      <div className="max-w-[640px] mx-auto">
        <CustomBreadcrumb
          pages={[{ name: t("breadcrumb"), link: "/dang-nhap" }]}
        />
        <LoginForm />
      </div>
    </SectionContainer>
  );
};

export default LoginPage;
