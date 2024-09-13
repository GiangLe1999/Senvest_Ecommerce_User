import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChartColumnDecreasingIcon,
  HeartIcon,
  Loader2Icon,
  ShoppingCartIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { addNewProductToWishlist } from "@/actions/user-wishlist.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "@/configs/i18n-navigation";

const btnClassname =
  "absolute top-3 right-3 w-8 h-8 bg-[#ffece4] hover:bg-primary hover:text-white grid place-items-center rounded-sm border border-white";

interface Props {
  _id: string;
  variant_id: string;
  t: any;
  isVi: boolean;
  showAddToCartBtn: boolean;
  addToCartHandler: () => void;
  addToCompareHandler: () => void;
  setOpenQuickView: Dispatch<SetStateAction<boolean>>;
}

const ActionButtons: FC<Props> = ({
  _id,
  variant_id,
  t,
  showAddToCartBtn,
  isVi,
  addToCartHandler,
  setOpenQuickView,
  addToCompareHandler,
}): JSX.Element => {
  const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const addToWishlistHandler = async () => {
    if (!session) {
      return toast.error(t("add_to_wl_fail"), {
        description: t("add_to_wl_fail_desc_1"),
        action: {
          label: t("login"),
          onClick: () => {
            router.push("/dang-nhap");
          },
        },
      });
    }

    try {
      setAddToWishlistLoading(true);
      const res = await addNewProductToWishlist({
        _id,
        variant_id,
        quantity: 1,
      });

      if (res.ok) {
        setAddToWishlistLoading(false);
        toast.success(t("add_to_wl_success"), {
          description: t("add_to_wl_desc"),
          action: {
            label: t("view_wl"),
            onClick: () => {
              window.location.href = isVi
                ? "/vi/tai-khoan/san-pham-yeu-thich"
                : "/en/account/wishlist";
            },
          },
        });
      } else {
        setAddToWishlistLoading(false);
        return toast.error(t("add_to_wl_fail"), {
          description: t("add_to_wl_fail_desc_2"),
        });
      }
    } catch (error) {
      setAddToWishlistLoading(false);
      return toast.error(t("add_to_wl_fail"), {
        description: t("add_to_wl_fail_desc_3"),
      });
    }
  };

  return (
    <>
      {/* Action buttons */}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            className={cn(
              btnClassname,
              showAddToCartBtn ? "translate-x-0" : "translate-x-12",
              "product-card-btn-1"
            )}
            onClick={(e) => {
              e.stopPropagation();
              addToCartHandler();
            }}
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className="w-3 h-3" />
          </TooltipTrigger>

          <TooltipContent align="start" side="left" className="bg-black">
            <p>{t("add_to_cart")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            className={cn(
              btnClassname,
              "top-12",
              showAddToCartBtn ? "translate-x-0" : "translate-x-12",
              "product-card-btn-2"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setOpenQuickView(true);
            }}
            aria-label="Quick view"
          >
            <SquareArrowOutUpRightIcon className="w-3 h-3" />
          </TooltipTrigger>
          <TooltipContent align="start" side="left" className="bg-black">
            <p>{t("quick_view")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            className={cn(
              btnClassname,
              "top-[84px]",
              showAddToCartBtn ? "translate-x-0" : "translate-x-12",
              "product-card-btn-3"
            )}
            onClick={(e) => {
              e.stopPropagation();
              addToCompareHandler();
            }}
            aria-label="Compare"
          >
            <ChartColumnDecreasingIcon className="w-3 h-3" />
          </TooltipTrigger>
          <TooltipContent align="start" side="left" className="bg-black">
            <p>{t("compare")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger
            className={cn(
              btnClassname,
              "top-[120px]",
              showAddToCartBtn ? "translate-x-0" : "translate-x-12",
              "product-card-btn-4"
            )}
            onClick={(e) => {
              e.stopPropagation();
              addToWishlistHandler();
            }}
            disabled={addToWishlistLoading}
            aria-label="Add to Wishlist"
          >
            {addToWishlistLoading ? (
              <Loader2Icon className="w-3 h-3 animate-spin" />
            ) : (
              <HeartIcon className="w-3 h-3" />
            )}
          </TooltipTrigger>
          <TooltipContent align="start" side="left" className="bg-black">
            <p>{t("add_to_wishlist")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ActionButtons;
