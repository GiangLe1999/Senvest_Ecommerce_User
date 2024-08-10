import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { UserAddress } from "@/entities/user-address.entity";
import AddUpdateAddressForm from "../add-address-page/add-update-address-form";

interface Props {
  address: UserAddress;
}

const UpdateAddressPageContent: FC<Props> = ({ address }): JSX.Element => {
  const t = useTranslations("add_address_page");
  const t2 = useTranslations("update_address_page");

  return (
    <SectionContainer>
      <SmallSectionContainer>
        <CustomBreadcrumb
          pages={[
            { name: t("breadcrumb_1"), link: "/tai-khoan" },
            { name: t("breadcrumb_2"), link: "/tai-khoan/dia-chi" },
            { name: t2("breadcrumb_3"), link: "/tai-khoan/dia-chi/tao-moi" },
          ]}
        />

        <AddUpdateAddressForm initialAddress={address} />
      </SmallSectionContainer>
    </SectionContainer>
  );
};

export default UpdateAddressPageContent;
