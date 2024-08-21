import Empty from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Link } from "@/configs/i18n-navigation";
import { CirclePlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const NoAccountWishlistItems: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("account_wishlist_page");
  return (
    <>
      <Empty />
      <div className="text-center mt-4">
        <Button>
          <Link href="/" className="flex items-center">
            <CirclePlusIcon className="w-4 h-4 mr-1" /> {t("add_more")}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default NoAccountWishlistItems;
