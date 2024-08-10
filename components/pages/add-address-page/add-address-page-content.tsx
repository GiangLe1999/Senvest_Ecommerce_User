import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import AddAddressForm from "./add-address-form";

interface Props {}

const AddAddressPageContent: FC<Props> = (): JSX.Element => {
  const t = useTranslations("add_address_page");

  return (
    <SectionContainer>
      <SmallSectionContainer>
        <CustomBreadcrumb
          pages={[
            { name: t("breadcrumb_1"), link: "/tai-khoan" },
            { name: t("breadcrumb_2"), link: "/tai-khoan/dia-chi" },
            { name: t("breadcrumb_3"), link: "/tai-khoan/dia-chi/tao-moi" },
          ]}
        />

        <AddAddressForm />
      </SmallSectionContainer>
    </SectionContainer>
  );
};

export default AddAddressPageContent;
