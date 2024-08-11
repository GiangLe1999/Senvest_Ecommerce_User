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
  ShoppingCartIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import QuickView from "./quick-view";
import { Product } from "@/entities/product.entity";

const btnClassname =
  "absolute top-3 right-3 w-8 h-8 bg-[#ffece4] hover:bg-primary hover:text-white grid place-items-center rounded-sm border border-white";

interface Props {
  t: any;
  showAddToCartBtn: boolean;
  addToCartHandler: () => void;
  product: Product;
  isVi: boolean;
  activeVariantIndex: number;
  setActiveVariantIndex: Dispatch<SetStateAction<number>>;
  activeVariant: Product["variants"][0];
}

const ActionButtons: FC<Props> = ({
  t,
  showAddToCartBtn,
  addToCartHandler,
  product,
  isVi,
  activeVariantIndex,
  setActiveVariantIndex,
  activeVariant,
}): JSX.Element => {
  const [openQuickView, setOpenQuickView] = useState(false);

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
          >
            <HeartIcon className="w-3 h-3" />
          </TooltipTrigger>
          <TooltipContent align="start" side="left" className="bg-black">
            <p>{t("add_to_wishlist")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* QuickView */}
      <QuickView
        open={openQuickView}
        setOpen={setOpenQuickView}
        product={product}
        activeVariant={activeVariant}
        isVi={isVi}
        activeVariantIndex={activeVariantIndex}
        setActiveVariantIndex={setActiveVariantIndex}
      />
    </>
  );
};

export default ActionButtons;
