import CustomBreadcrumb from "@/components/custom-breadcrumb";
import RegisterForm from "@/components/pages/register-page/register-form";
import SectionContainer from "@/components/section-container";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const RegisterPage: NextPage<Props> = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <SectionContainer>
      <div className="max-w-[640px] mx-auto">
        <CustomBreadcrumb pages={[{ name: "Đăng ký", link: "/dang-ki" }]} />
        <RegisterForm />
      </div>
    </SectionContainer>
  );
};

export default RegisterPage;
