import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import ResetPasswordForm from "./reset-password-form";

interface Props {
  token: string;
}

const ResetPasswordPageContent: FC<Props> = ({ token }): JSX.Element => {
  const t = useTranslations("reset_password_page");

  return (
    <SectionContainer>
      <div className="max-w-[640px] mx-auto">
        <CustomBreadcrumb
          pages={[{ name: t("breadcrumb"), link: "/quen-mat-khau" }]}
        />
        <ResetPasswordForm token={token} />
      </div>
    </SectionContainer>
  );
};

export default ResetPasswordPageContent;
