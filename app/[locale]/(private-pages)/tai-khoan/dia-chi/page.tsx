import AccountAddressesPageContent from "@/components/pages/account-addresses-page/account-addresses-page-content";
import { getUserAddresses } from "@/queries/user-addresses.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const AccountAddressesPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { data } = await getUserAddresses();

  return <AccountAddressesPageContent addresses={data} />;
};

export default AccountAddressesPage;
