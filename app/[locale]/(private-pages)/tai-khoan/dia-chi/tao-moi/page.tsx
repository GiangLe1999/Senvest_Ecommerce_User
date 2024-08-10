import AddAddressPageContent from "@/components/pages/add-address-page/add-address-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const AddAddressPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <AddAddressPageContent />;
};

export default AddAddressPage;
