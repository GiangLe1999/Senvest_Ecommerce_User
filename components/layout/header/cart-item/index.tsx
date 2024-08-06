import { FC } from "react";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from "@/components/hybrid-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link } from "@/configs/i18n-navigation";
import { ShoppingBagIcon } from "lucide-react";
interface Props {}

const CartItem: FC<Props> = (props): JSX.Element => {
  return (
    <TooltipProvider>
      <TouchProvider>
        <HybridTooltip>
          <HybridTooltipTrigger className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
            <div className="relative">
              <ShoppingBagIcon className="w-5 h-5" />
              <div className="bg-primary w-4 h-4 grid place-items-center leading-none text-[10px] rounded-full text-white absolute -top-2 -right-1">
                3
              </div>
            </div>
          </HybridTooltipTrigger>
          <HybridTooltipContent
            align="end"
            className="border shadow-md p-3 px-4 w-max rounded-sm"
          >
            <nav>
              <ul className="text-muted text-[13px] space-y-1">
                <li className="py-1 mb-1 hover:text-primary transition-colors">
                  Sign in
                </li>
                <li className="py-1 my-1 hover:text-primary transition-colors">
                  <Link href="/dong-gop">Wishlist</Link>
                </li>
                <li className="py-1 my-1 hover:text-primary transition-colors">
                  <Link href="/faqs">Compare</Link>
                </li>
                <li className="py-1 my-1 hover:text-primary transition-colors">
                  <Link href="/faqs">Checkout</Link>
                </li>
              </ul>
            </nav>
          </HybridTooltipContent>
        </HybridTooltip>
      </TouchProvider>
    </TooltipProvider>
  );
};

export default CartItem;
