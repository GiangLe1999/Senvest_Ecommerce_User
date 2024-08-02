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

interface Props {}

const LanguageSwitcher: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const changeLocaleHandler = () => {
    startTransition(() => {
      if (pathname.startsWith("/project") || pathname.startsWith("/du-an")) {
        // const currentSlug = params.projectSlug as string;
        // const newSlug =
        //   locale === "vi"
        //     ? projectSlugMappings[currentSlug]
        //     : Object.keys(projectSlugMappings).find(
        //         (key) => projectSlugMappings[key] === currentSlug
        //       );
        // router.replace(
        //   { pathname, params: { ...params, projectSlug: newSlug } },
        //   { locale: locale === "vi" ? "en" : "vi" }
        // );
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
          <HybridTooltipContent className="p-0">
            <ul className="text-muted text-xs">
              <li
                className={cn(
                  "py-2 px-4 hover:text-primary hover:bg-primary/10 transition rounded-t-sm",
                  locale === "en" && "text-primary font-bold"
                )}
              >
                <button onClick={changeLocaleHandler}>{t("en")}</button>
              </li>
              <li
                className={cn(
                  "py-2 px-4 hover:text-primary hover:bg-primary/10 transition rounded-b-sm",
                  locale === "vi" && "text-primary font-bold"
                )}
              >
                <button onClick={changeLocaleHandler}>{t("vi")}</button>
              </li>
            </ul>
          </HybridTooltipContent>
        </HybridTooltip>
      </TouchProvider>
    </TooltipProvider>
  );
};

export default LanguageSwitcher;
