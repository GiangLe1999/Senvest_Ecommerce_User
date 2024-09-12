import { getUserProfile } from "@/actions/user.actions";
import AccountProfilePageContent from "@/components/pages/account-profile-page/account-profile-page-content";
import { Metadata, NextPage } from "next";
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
      ? "Thông tin người dùng | Kindle Hope Candles"
      : "User Information | Kindle Hope Candles",
    description: isVi
      ? "Cập nhật và quản lý thông tin cá nhân của bạn tại Kindle Hope Candles."
      : "Update and manage your personal information on your Kindle Hope Candles account.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/${
        isVi ? "tai-khoan/thong-tin" : "account/profile"
      }`,
    },
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
