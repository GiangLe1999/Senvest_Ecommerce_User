import UpdateAddressPageContent from "@/components/pages/update-address-page/update-address-page-content";
import { getUserAddress } from "@/queries/user-addresses.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    id: string;
  };
}

const UpdateAddressPage: NextPage<Props> = async ({
  params: { locale, id },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { data } = await getUserAddress(id);

  return <UpdateAddressPageContent address={data} />;
};

export default UpdateAddressPage;
