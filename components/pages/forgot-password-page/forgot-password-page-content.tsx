import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import ForgotPasswordForm from "./forgot-password-form";

interface Props {}

const ForgotPasswordPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("forgot_password_page");

  return (
    <SectionContainer>
      <div className="max-w-[640px] mx-auto">
        <CustomBreadcrumb
          pages={[{ name: t("breadcrumb"), link: "/quen-mat-khau" }]}
        />
        <ForgotPasswordForm />
      </div>
    </SectionContainer>
  );
};

export default ForgotPasswordPageContent;
