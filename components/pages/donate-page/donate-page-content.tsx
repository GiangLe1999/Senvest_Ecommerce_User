import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import DonateForm from "./donate-form";
import { Link } from "@/configs/i18n-navigation";

interface Props {}

const DonatePageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("donate_page");

  return (
    <SmallSectionContainer className="mt-12 !max-w-5xl">
      <CustomBreadcrumb pages={[{ name: t("heading"), link: "/dong-gop" }]} />

      <div className="lg:flex gap-6 mt-10">
        <div className="bg-white shadow-md rounded-md lg:w-[55%] w-full">
          <div className="w-full aspect-[1.78] relative rounded-t-sm">
            <Image
              src="/donate-page/left-donate-bg.jpeg"
              alt="Checkout block background"
              className="rounded-t-sm"
              sizes="100vw"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="px-6 py-7">
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/logo.svg"
                alt="Kindle Hope Candles Logo"
                width={75}
                height={56.25}
                priority
              />
            </Link>

            <p className="text-2xl font-semibold leading-none tracking-tight mb-2 mt-6">
              {t("title")}
            </p>
            <p className="text-sm text-muted-foreground">{t("desc")}</p>

            <p className="text-sm font-bold mt-4 mb-1">{t("question_1")}</p>
            <p className="text-sm text-muted-foreground">{t("answer_1")}</p>

            <p className="text-sm font-bold mt-4 mb-1">{t("question_2")}</p>
            <p className="text-sm text-muted-foreground">{t("answer_2")}</p>
          </div>
        </div>

        <div className="lg:mt-0 mt-10 flex-1 bg-white shadow-md rounded-md border-t border-[#eeeeee]">
          <DonateForm />
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default DonatePageContent;
