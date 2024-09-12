"use client";

import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { useCartStore } from "@/stores/useCartStore";
import { CircleCheckBigIcon, MoveLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useEffect } from "react";

interface Props {}

const ThankYouPageContent: FC<Props> = (): JSX.Element => {
  const t = useTranslations("thank_you_page");

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <SmallSectionContainer>
      <main className="mt-12">
        <div className="lg:flex items-center gap-16">
          <div className="relative sm:w-[40%] w-[90%] mx-auto aspect-[1.037]">
            <Image
              src="/thank-you-page/congratulation.svg"
              alt="Congratulation"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
              priority
            />
          </div>
          <div className="flex-1 lg:mt-0 mt-12 lg:text-left text-center">
            <h1 className="flex items-center lg:justify-start justify-center gap-3 font-bold text-emerald-600 lg:text-4xl text-2xl mb-4 flex-wrap">
              <CircleCheckBigIcon className="lg:w-8 lg:h-8 w-6 h-6" />{" "}
              {t("heading")}
            </h1>
            <h2 className="lg:text-xl text-base font-bold mb-4">
              {t("sub_heading")}
            </h2>
            <ul className="lg:list-disc list-none list-inside text-muted space-y-2 mb-7 lg:text-base text-sm">
              <li>{t("item_1")}</li>
              <li>{t("item_2")}</li>
              <li>{t("item_3")} </li>
              <li>
                <Link
                  href="/lien-he"
                  className="font-bold hover:text-primary transition-colors hover:underline"
                >
                  {t("item_4_1")}
                </Link>{" "}
                {t("item_4_2")}
              </li>
            </ul>
            <Link
              href="/"
              className="bg-primary hover:bg-background transition-none text-white px-6 py-3 rounded-sm flex items-center gap-2 w-fit lg:mx-0 mx-auto"
            >
              <MoveLeftIcon className="w-4 h-4" /> {t("back_to_home")}
            </Link>
          </div>
        </div>
      </main>
    </SmallSectionContainer>
  );
};

export default ThankYouPageContent;
