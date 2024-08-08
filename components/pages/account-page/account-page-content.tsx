import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import AccountPageItems from "./account-page-items";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

const AccountPageContent: FC<Props> = ({ session }): JSX.Element => {
  const t = useTranslations("account_page");

  return (
    <SectionContainer>
      <CustomBreadcrumb pages={[{ name: t("breadcrumb"), link: "/account" }]} />
      <AccountPageItems session={session} />
    </SectionContainer>
  );
};

export default AccountPageContent;
