import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import AccountProfileForm from "./account-profile-form";
import { User } from "@/entities/user.entity";

interface Props {
  userProfile: User;
}

const AccountProfilePageContent: FC<Props> = ({ userProfile }): JSX.Element => {
  const t = useTranslations("account_profile_page");

  return (
    <SectionContainer>
      <SmallSectionContainer>
        <CustomBreadcrumb
          pages={[
            { name: t("breadcrumb_1"), link: "/tai-khoan" },
            { name: t("breadcrumb_2"), link: "/tai-khoan/thong-tin" },
          ]}
        />

        <AccountProfileForm userProfile={userProfile} />
      </SmallSectionContainer>
    </SectionContainer>
  );
};

export default AccountProfilePageContent;
