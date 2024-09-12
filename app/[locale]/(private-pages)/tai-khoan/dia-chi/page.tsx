import AccountAddressesPageContent from "@/components/pages/account-addresses-page/account-addresses-page-content";
import { getUserAddresses } from "@/queries/user-addresses.queries";
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
      ? "Danh sách địa chỉ của bạn | Kindle Hope Candles"
      : "Your Address List | Kindle Hope Candles",
    description: isVi
      ? "Xem và quản lý tất cả các địa chỉ giao hàng đã lưu trên tài khoản của bạn tại Kindle Hope Candles."
      : "View and manage all your saved shipping addresses on your Kindle Hope Candles account.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/${
        isVi ? "tai-khoan/dia-chi" : "account/addresses"
      }`,
    },
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
