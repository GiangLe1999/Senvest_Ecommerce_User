import AccountPageContent from "@/components/pages/account-page/account-page-content";
import { authOptions } from "@/lib/auth";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const AccountPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const session = await getServerSession(authOptions);

  return <AccountPageContent session={session} />;
};

export default AccountPage;
