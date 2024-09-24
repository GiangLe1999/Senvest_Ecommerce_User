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
    <div className="hidden sm:flex fixed bottom-[85px] z-[49] right-4 flex-col gap-y-2">
      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger>
              <Link href="tel:+:84779741998">
                <Phone className="w-11 h-11" />
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
                <Zalo className="w-11 h-11" />
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
                <Messenger className="w-11 h-11" />
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
                <Email className="w-11 h-11" />
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
                <Address className="w-11 h-11" />
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
