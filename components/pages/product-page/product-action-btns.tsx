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
import ProductAskQuestion from "./product-ask-question";

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
  const [showAskQuestion, setShowAskQuestion] = useState(false);

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
      <div className="flex flex-wrap items-center !my-6 text-sm">
        <button
          type="button"
          className="flex items-center sm:gap-2 gap-[3px] sm:pr-6 pr-2 border-r hover:text-primary transition-colors sm:text-base text-sm"
          onClick={addToWishlistHandler}
        >
          {addToWishlistLoading ? (
            <Loader2Icon className="sm:w-4 sm:h-4 h-3 w-3 animate-spin" />
          ) : (
            <HeartIcon className="sm:w-4 sm:h-4 h-3 w-3" />
          )}
          {t("wishlist")}
        </button>
        <button
          type="button"
          className="flex items-center sm:gap-2 gap-[3px] sm:px-6 px-2 border-r hover:text-primary transition-colors sm:text-base text-sm"
          onClick={addToCompareHandler}
        >
          <ChartColumnIncreasingIcon className="sm:w-4 sm:h-4 h-3 w-3" />{" "}
          {t("compare")}
        </button>
        <button
          type="button"
          onClick={() => setShowAskQuestion(true)}
          className="flex items-center sm:gap-2 gap-[3px] sm:px-6 px-2 border-r hover:text-primary transition-colors sm:text-base text-sm"
        >
          <CircleHelpIcon className="sm:w-4 sm:h-4 h-3 w-3" />{" "}
          {t("ask_question")}
        </button>
        <button
          type="button"
          onClick={() => setShowShare(true)}
          className="flex items-center sm:gap-2 gap-[3px] sm:px-6 px-2 hover:text-primary transition-colors sm:text-base text-sm"
        >
          <Share2 className="sm:w-4 sm:h-4 h-3 w-3" /> {t("share")}
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

      <ProductAskQuestion
        open={showAskQuestion}
        setOpen={setShowAskQuestion}
        session={session}
        t={t}
        product_id={product._id}
      />
    </>
  );
};

export default ProductActionBtns;
