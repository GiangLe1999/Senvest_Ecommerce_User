import { Wishlist } from "@/entities/wishlist.entity";
import { FC } from "react";
import WishlistItem from "./wishlist-item";
import NoAccountWishlistItems from "./no-account-wishlist-items";

interface Props {
  t: any;
  wishlist: Wishlist;
}

const WishlistItems: FC<Props> = ({ t, wishlist }): JSX.Element => {
  return (
    <div>
      <h1 className="text-xl font-bold my-8">{t("breadcrumb_2")}</h1>

      {wishlist?.items?.length > 0 ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {wishlist.items.map((item, index) => (
            <WishlistItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <NoAccountWishlistItems />
      )}
    </div>
  );
};

export default WishlistItems;
