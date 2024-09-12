import AccountPageContent from "@/components/pages/account-page/account-page-content";
import { authOptions } from "@/lib/auth";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Tài Khoản Của Bạn | Kindle Hope Candles"
      : "Your Account | Kindle Hope Candles",
    description: isVi
      ? "Quản lý thông tin cá nhân, đơn hàng và khám phá các ưu đãi độc quyền dành cho thành viên!"
      : "Manage your personal info, orders, and explore exclusive member offers!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "tai-khoan" : "account"
      }`,
    },
  };
}

const AccountPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const session = await getServerSession(authOptions);

  return <AccountPageContent session={session} />;
};

export default AccountPage;
