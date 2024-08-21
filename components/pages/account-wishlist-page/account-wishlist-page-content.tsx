import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { Wishlist } from "@/entities/wishlist.entity";
import { useTranslations } from "next-intl";
import { FC } from "react";
import WishlistItems from "./wishlist-items";
import SmallSectionContainer from "@/components/small-section-container";

interface Props {
  wishlist: Wishlist;
}

const AccountWishlistPageContent: FC<Props> = ({ wishlist }): JSX.Element => {
  const t = useTranslations("account_wishlist_page");

  return (
    <SmallSectionContainer>
      <CustomBreadcrumb
        pages={[
          { name: t("breadcrumb_1"), link: "/tai-khoan" },
          { name: t("breadcrumb_2"), link: "/tai-khoan/san-pham-yeu-thich" },
        ]}
      />

      <WishlistItems t={t} wishlist={wishlist} />
    </SmallSectionContainer>
  );
};

export default AccountWishlistPageContent;
