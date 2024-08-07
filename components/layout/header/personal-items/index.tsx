import { FC } from "react";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from "@/components/hybrid-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/configs/i18n-navigation";

interface Props {}

const PersonalItems: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("navigation");

  return (
    <TooltipProvider>
      <TouchProvider>
        <HybridTooltip>
          <HybridTooltipTrigger className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
            <User className="w-5 h-5" />
          </HybridTooltipTrigger>
          <HybridTooltipContent
            align="end"
            className="border shadow-md p-3 px-4 w-max rounded-sm min-w-[120px]"
          >
            <nav>
              <ul className="text-muted text-[13px]">
                <li>
                  <Link
                    className="block w-full py-2 hover:text-primary transition-colors"
                    href="/dang-ki"
                  >
                    {t("register")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full py-2 hover:text-primary transition-colors"
                    href="/dang-nhap"
                  >
                    {t("sign_in")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full py-2 hover:text-primary transition-colors"
                    href="/dong-gop"
                  >
                    {t("wishlist")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full py-2 hover:text-primary transition-colors"
                    href="/faqs"
                  >
                    {t("compare")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full py-2 hover:text-primary transition-colors"
                    href="/faqs"
                  >
                    {t("checkout")}
                  </Link>
                </li>
              </ul>
            </nav>
          </HybridTooltipContent>
        </HybridTooltip>
      </TouchProvider>
    </TooltipProvider>
  );
};

export default PersonalItems;
