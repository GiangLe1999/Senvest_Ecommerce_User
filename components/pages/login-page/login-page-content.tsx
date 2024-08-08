import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import LoginForm from "./login-form";

interface Props {}

const LoginPageContent: FC<Props> = (props): JSX.Element => {
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

export default LoginPageContent;
