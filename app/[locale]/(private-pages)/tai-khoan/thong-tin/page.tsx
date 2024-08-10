import { getUserProfile } from "@/actions/user.actions";
import AccountProfilePageContent from "@/components/pages/account-profile-page/account-profile-page-content";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const AccountProfilePage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);
  const { data } = await getUserProfile();

  return <AccountProfilePageContent userProfile={data} />;
};

export default AccountProfilePage;
