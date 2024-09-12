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
import { Link, useRouter } from "@/configs/i18n-navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import useFromStore from "@/hooks/useFromStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useCartStore } from "@/stores/useCartStore";

interface Props {
  session: Session | null;
  wishlistLength: number;
}

const itemClassname =
  "block w-full py-2 hover:text-primary transition-colors text-left";

const PersonalItems: FC<Props> = ({ session, wishlistLength }): JSX.Element => {
  const t = useTranslations("navigation");
  const items = useFromStore(useCompareStore, (state) => state.items);
  const { totalItems } = useCartStore((state) => state);
  const router = useRouter();

  return (
    <div onClick={(e) => router.push("/tai-khoan")}>
      <TooltipProvider>
        <TouchProvider>
          <HybridTooltip>
            <HybridTooltipTrigger className="h-full flex items-center hover:text-primary transition-colors px-2 font-bold text-sm">
              <User className="sm:w-5 sm:h-5 w-4 h-4" />
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
                        <Link className={itemClassname} href="/dang-nhap">
                          {t("sign_in")}
                        </Link>
                      </li>
                      <li>
                        <Link className={itemClassname} href="/dang-ki">
                          {t("register")}
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

                  {session && (
                    <li>
                      <Link
                        className={itemClassname}
                        href="/tai-khoan/san-pham-yeu-thich"
                      >
                        {t("wishlist")} ({wishlistLength})
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link className={itemClassname} href="/so-sanh">
                      {t("compare")} ({items ? items?.length : 0})
                    </Link>
                  </li>

                  {totalItems > 0 && (
                    <li>
                      <Link className={itemClassname} href="/thanh-toan">
                        {t("checkout")}
                      </Link>
                    </li>
                  )}

                  {session && (
                    <li>
                      <button
                        className={itemClassname}
                        onClick={() => signOut()}
                      >
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
    </div>
  );
};

export default PersonalItems;
