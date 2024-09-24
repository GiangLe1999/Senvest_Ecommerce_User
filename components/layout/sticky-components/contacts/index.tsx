"use client";

import { FC } from "react";
import Phone from "./phone";
import Zalo from "./zalo";
import Link from "next/link";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from "@/components/hybrid-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import Messenger from "./messenger";
import Email from "./email";
import Address from "./address";
import { Link as HybridLink } from "@/configs/i18n-navigation";

interface Props {}

const Contacts: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("sticky_contacts");

  return (
    <div className="flex fixed bottom-4 z-[49] sm:right-4 right-2 flex-col gap-y-2">
      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger>
              <Link href="tel:+:84779741998">
                <Phone className="sm:w-11 sm:h-11 w-9 h-9" />
              </Link>
            </HybridTooltipTrigger>
            <HybridTooltipContent
              side="left"
              className="bg-background text-white"
            >
              <Link href="tel:+:84779741998">{t("phone")}</Link>
            </HybridTooltipContent>
          </HybridTooltip>
        </TouchProvider>
      </TooltipProvider>

      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger>
              <Link href="https://zalo.me/0779741998" target="_blank">
                <Zalo className="sm:w-11 sm:h-11 w-9 h-9" />
              </Link>
            </HybridTooltipTrigger>
            <HybridTooltipContent
              side="left"
              className="bg-background text-white"
            >
              <Link href="https://zalo.me/0779741998" target="_blank">
                {t("zalo")}
              </Link>
            </HybridTooltipContent>
          </HybridTooltip>
        </TouchProvider>
      </TooltipProvider>

      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger>
              <Link href="https://zalo.me/0779741998" target="_blank">
                <Messenger className="sm:w-11 sm:h-11 w-9 h-9" />
              </Link>
            </HybridTooltipTrigger>
            <HybridTooltipContent
              side="left"
              className="bg-background text-white"
            >
              <Link href="https://zalo.me/0779741998" target="_blank">
                {t("messenger")}
              </Link>
            </HybridTooltipContent>
          </HybridTooltip>
        </TouchProvider>
      </TooltipProvider>

      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger>
              <Link href="mailto:kindlehopecandles@gmail.com">
                <Email className="sm:w-11 sm:h-11 w-9 h-9" />
              </Link>
            </HybridTooltipTrigger>
            <HybridTooltipContent
              side="left"
              className="bg-background text-white"
            >
              <Link href="mailto:kindlehopecandles@gmail.com">
                {t("email")}
              </Link>
            </HybridTooltipContent>
          </HybridTooltip>
        </TouchProvider>
      </TooltipProvider>

      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger>
              <Link href="/contact">
                <Address className="sm:w-11 sm:h-11 w-9 h-9" />
              </Link>
            </HybridTooltipTrigger>
            <HybridTooltipContent
              side="left"
              className="bg-background text-white"
            >
              <HybridLink href="/lien-he">{t("address")}</HybridLink>
            </HybridTooltipContent>
          </HybridTooltip>
        </TouchProvider>
      </TooltipProvider>
    </div>
  );
};

export default Contacts;
