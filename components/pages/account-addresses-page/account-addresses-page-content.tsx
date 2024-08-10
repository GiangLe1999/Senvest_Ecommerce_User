import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import AccountAddressesList from "./account-addresses-list";
import { UserAddress } from "@/entities/user-address.entity";

interface Props {
  addresses: UserAddress[];
}

const AccountAddressesPageContent: FC<Props> = ({ addresses }): JSX.Element => {
  const t = useTranslations("account_addresses_page");

  return (
    <SectionContainer>
      <CustomBreadcrumb
        pages={[
          { name: t("breadcrumb_1"), link: "/tai-khoan" },
          { name: t("breadcrumb_2"), link: "/tai-khoan/dia-chi" },
        ]}
      />

      <AccountAddressesList addresses={addresses} />
    </SectionContainer>
  );
};

export default AccountAddressesPageContent;
