"use client";

import { useParams } from "next/navigation";
import { FC, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/configs/i18n-navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from "@/components/hybrid-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
  productSlugsMapping: { [key: string]: string };
}

const LanguageSwitcher: FC<Props> = ({ productSlugsMapping }): JSX.Element => {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const changeLocaleHandler = () => {
    startTransition(() => {
      if (pathname.startsWith("/san-pham") || pathname.startsWith("/product")) {
        const currentSlug = params.productSlug as string;
        const newSlug =
          locale === "en"
            ? productSlugsMapping[currentSlug]
            : Object.keys(productSlugsMapping).find(
                (key) => productSlugsMapping[key] === currentSlug
              );
        router.replace(
          // @ts-expect-error
          { pathname, params: { ...params, productSlug: newSlug } },
          { locale: locale === "vi" ? "en" : "vi" }
        );
      } else
        router.replace(
          // @ts-expect-error
          { pathname, params },
          { locale: locale === "vi" ? "en" : "vi" }
        );
    });
  };

  return (
    <TooltipProvider>
      <TouchProvider>
        <HybridTooltip>
          <HybridTooltipTrigger className="w-fit h-full ml-auto text-white text-xs uppercase flex items-center cursor-pointer">
            {locale === "vi" ? "Tiếng Việt" : "English"}
            <ChevronDown className="h-3 w-3 ml-1" />
          </HybridTooltipTrigger>
          <HybridTooltipContent align="end" className="p-0">
            <ul className="text-muted text-xs w-fit">
              <li
                className={cn(
                  "hover:text-primary hover:bg-primary/10 transition rounded-t-sm border-b border-[#eeeeee]",
                  locale === "en" && "text-primary font-bold"
                )}
              >
                <button
                  onClick={() => {
                    if (locale === "en") return;
                    changeLocaleHandler();
                  }}
                  className="w-full h-full py-2 px-4 text-left"
                >
                  {t("en")}
                </button>
              </li>
              <li
                className={cn(
                  "hover:text-primary hover:bg-primary/10 transition rounded-b-sm",
                  locale === "vi" && "text-primary font-bold"
                )}
              >
                <button
                  onClick={() => {
                    if (locale === "vi") return;
                    changeLocaleHandler();
                  }}
                  className="w-full h-full py-2 px-4 text-left"
                >
                  {t("vi")}
                </button>
              </li>
            </ul>
          </HybridTooltipContent>
        </HybridTooltip>
      </TouchProvider>
    </TooltipProvider>
  );
};

export default LanguageSwitcher;
