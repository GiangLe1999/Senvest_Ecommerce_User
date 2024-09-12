"use client";

import SecureDonation from "@/components/pages/donate-page/secure-donation";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useRouter } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const MobileNavigationFooter: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("donate_page");
  const router = useRouter();
  return (
    <div className="rounded bg-[#f3f4f6] border shadow-md p-5 mt-10 mb-8">
      <p className="text-lg font-semibold leading-none tracking-tight flex items-center justify-center gap-x-2">
        <SecureDonation className="text-primary" />
        {t("secure_donation")}
      </p>
      <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
        {t("answer_2")}
      </p>
      <SheetClose className="w-full">
        <Button className="w-full" onClick={() => router.push("/dong-gop")}>
          {t("heading")}
        </Button>
      </SheetClose>
    </div>
  );
};

export default MobileNavigationFooter;
