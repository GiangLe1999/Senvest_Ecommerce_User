"use client";

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
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface Props {
  session: Session | null;
}

const itemClassname =
  "block w-full py-2 hover:text-primary transition-colors text-left";

const PersonalItems: FC<Props> = ({ session }): JSX.Element => {
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
                {!session ? (
                  <>
                    <li>
                      <Link className={itemClassname} href="/dang-ki">
                        {t("register")}
                      </Link>
                    </li>
                    <li>
                      <Link className={itemClassname} href="/dang-nhap">
                        {t("sign_in")}
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className={itemClassname} href="/tai-khoan">
                      {t("account")}
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    className={itemClassname}
                    href="/tai-khoan/san-pham-yeu-thich"
                  >
                    {t("wishlist")} (0)
                  </Link>
                </li>
                <li>
                  <Link className={itemClassname} href="/faqs">
                    {t("compare")} (0)
                  </Link>
                </li>
                <li>
                  <Link className={itemClassname} href="/faqs">
                    {t("checkout")}
                  </Link>
                </li>

                {session && (
                  <li>
                    <button className={itemClassname} onClick={() => signOut()}>
                      {t("sign_out")}
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </HybridTooltipContent>
        </HybridTooltip>
      </TouchProvider>
    </TooltipProvider>
  );
};

export default PersonalItems;
