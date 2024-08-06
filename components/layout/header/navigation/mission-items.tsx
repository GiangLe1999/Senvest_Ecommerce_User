import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from "@/components/hybrid-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link } from "@/configs/i18n-navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const MissionItems: FC<Props> = (): JSX.Element => {
  const t = useTranslations("navigation");

  return (
    <TooltipProvider>
      <TouchProvider>
        <HybridTooltip>
          <HybridTooltipTrigger className="h-full hover:text-primary transition-colors px-5 uppercase font-bold text-sm">
            <Link href="/su-menh" className="flex items-center">
              {t("mission")}
              <ChevronDown className="ml-2 w-3.5 h-3.5" />
            </Link>
          </HybridTooltipTrigger>
          <HybridTooltipContent
            align="center"
            className="border shadow-md p-3 px-4 w-max rounded-sm"
          >
            <nav>
              <ul className="text-muted text-[13px] space-y-1">
                <li className="py-1 mb-1 hover:text-primary transition-colors">
                  <Link href="/su-menh">{t("mission_vs_impact")}</Link>
                </li>
                <li className="py-1 my-1 hover:text-primary transition-colors">
                  <Link href="/dong-gop">{t("donate")}</Link>
                </li>
                <li className="py-1 my-1 hover:text-primary transition-colors">
                  <Link href="/faqs">FAQs</Link>
                </li>
              </ul>
            </nav>
          </HybridTooltipContent>
        </HybridTooltip>
      </TouchProvider>
    </TooltipProvider>
  );
};

export default MissionItems;
