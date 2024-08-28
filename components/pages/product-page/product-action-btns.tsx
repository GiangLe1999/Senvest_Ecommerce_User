import { addNewProductToWishlist } from "@/actions/user-wishlist.actions";
import { useRouter } from "@/configs/i18n-navigation";
import { Product } from "@/entities/product.entity";
import { Variant } from "@/entities/variant.entity";
import { useCompareStore } from "@/stores/useCompareStore";
import {
  ChartColumnIncreasingIcon,
  CircleHelpIcon,
  HeartIcon,
  Loader2Icon,
  Share2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";
import ProductSocialShare from "./product-social-share";

interface Props {
  t: any;
  product: Product;
  activeVariant: Variant;
  isVi: boolean;
}

const ProductActionBtns: FC<Props> = ({
  t,
  product,
  activeVariant,
  isVi,
}): JSX.Element => {
  const { data: session } = useSession();
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const t2 = useTranslations("product_card");

  const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);
  const router = useRouter();

  const [showShare, setShowShare] = useState(false);

  const addToWishlistHandler = async () => {
    if (!session) {
      return toast.error(t2("add_to_wl_fail"), {
        description: t2("add_to_wl_fail_desc_1"),
        action: {
          label: t2("login"),
          onClick: () => {
            router.push(
              `/dang-nhap?next=/${isVi ? "vi" : "en"}/san-pham/${
                product.slug[isVi ? "vi" : "en"]
              }` as any
            );
          },
        },
      });
    }

    try {
      setAddToWishlistLoading(true);
      const res = await addNewProductToWishlist({
        _id: product._id,
        variant_id: activeVariant._id,
        quantity: 1,
      });

      if (res.ok) {
        setAddToWishlistLoading(false);
        toast.success(t2("add_to_wl_success"), {
          description: t2("add_to_wl_desc"),
          action: {
            label: t2("view_wl"),
            onClick: () => {
              window.location.href = isVi
                ? "/vi/tai-khoan/san-pham-yeu-thich"
                : "/en/account/wishlist";
            },
          },
        });
      } else {
        setAddToWishlistLoading(false);
        return toast.error(t2("add_to_wl_fail"), {
          description: t2("add_to_wl_fail_desc_2"),
        });
      }
    } catch (error) {
      setAddToWishlistLoading(false);
      return toast.error(t("add_to_wl_fail"), {
        description: t("add_to_wl_fail_desc_3"),
      });
    }
  };

  const addToCompareHandler = () => {
    addToCompare({
      _id: product._id,
      variant_id: activeVariant._id,
      price: activeVariant.price,
      discountedPrice: activeVariant?.discountedPrice,
      discountedFrom: activeVariant?.discountedFrom,
      discountedTo: activeVariant?.discountedTo,
      image: activeVariant.images[0],
      name: product.name,
      scent: activeVariant.fragrance,
      stock: activeVariant.stock,
      slug: product.slug,
      description: product.description,
      rating: product.rating,
      locale: isVi ? "vi" : "en",
    });
  };

  return (
    <>
      <div className="flex items-center !my-6 text-sm">
        <button
          type="button"
          className="flex items-center gap-2 pr-6 border-r hover:text-primary transition-colors"
          onClick={addToWishlistHandler}
        >
          {addToWishlistLoading ? (
            <Loader2Icon className="w-4 h-4 animate-spin" />
          ) : (
            <HeartIcon className="w-4 h-4" />
          )}
          {t("wishlist")}
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-6 border-r hover:text-primary transition-colors"
          onClick={addToCompareHandler}
        >
          <ChartColumnIncreasingIcon className="w-4 h-4" /> {t("compare")}
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-6 border-r hover:text-primary transition-colors"
        >
          <CircleHelpIcon className="w-4 h-4" /> {t("ask_question")}
        </button>
        <button
          type="button"
          onClick={() => setShowShare(true)}
          className="flex items-center gap-2 px-6 hover:text-primary transition-colors"
        >
          <Share2 className="w-4 h-4" /> {t("share")}
        </button>
      </div>

      <ProductSocialShare
        open={showShare}
        setOpen={setShowShare}
        url={
          process.env.NEXT_PUBLIC_APP_URL +
          `/${isVi ? "vi" : "en"}/${isVi ? "san-pham" : "product"}/${
            product.slug[isVi ? "vi" : "en"]
          }`
        }
      />
    </>
  );
};

export default ProductActionBtns;
