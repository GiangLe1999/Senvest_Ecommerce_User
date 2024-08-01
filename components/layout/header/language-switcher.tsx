"use client";

import { useParams } from "next/navigation";
import { FC, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/configs/i18n-navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger className="w-fit h-full ml-auto text-white text-xs uppercase flex items-center cursor-pointer">
        {locale === "vi" ? "Tiếng Việt" : "English"}
        <ChevronDown className="h-3 w-3 ml-1" />
      </HoverCardTrigger>
      <HoverCardContent
        className="border shadow-md w-[120px] rounded-sm p-0 -mt-[3]"
        align="end"
      >
        <ul className="text-muted text-xs">
          <li
            className={cn(
              "pt-2 pb-1 px-4 hover:text-primary transition-colors",
              locale === "en" && "text-primary"
            )}
          >
            <button onClick={changeLocaleHandler}>{t("en")}</button>
          </li>
          <li
            className={cn(
              "py-2 px-4 hover:text-primary transition-colors",
              locale === "vi" && "text-primary"
            )}
          >
            <button onClick={changeLocaleHandler}>{t("vi")}</button>
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LanguageSwitcher;
