import AccountWishlistPageContent from "@/components/pages/account-wishlist-page/account-wishlist-page-content";
import { getUserWishlist } from "@/queries/user-wishlist.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const AccountWishlistPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { wishlist } = await getUserWishlist();

  return <AccountWishlistPageContent wishlist={wishlist} />;
};

export default AccountWishlistPage;
