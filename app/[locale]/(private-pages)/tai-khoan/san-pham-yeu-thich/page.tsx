import AccountWishlistPageContent from "@/components/pages/account-wishlist-page/account-wishlist-page-content";
import { getUserWishlist } from "@/queries/user-wishlist.queries";
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
      ? "Danh sách sản phẩm yêu thích | Kindle Hope Candles"
      : "Wishlist | Kindle Hope Candles",
    description: isVi
      ? "Xem và quản lý các sản phẩm nến yêu thích của bạn tại Kindle Hope Candles."
      : "View and manage your favorite candle products at Kindle Hope Candles.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "tai-khoan/san-pham-yeu-thich" : "account/wishlist"
      }`,
    },
  };
}

const AccountWishlistPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  const data = await getUserWishlist();

  return <AccountWishlistPageContent wishlist={data?.wishlist} />;
};

export default AccountWishlistPage;
