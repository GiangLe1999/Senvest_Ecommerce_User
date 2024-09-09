import CustomBreadcrumb from "@/components/custom-breadcrumb";
import Logo from "@/components/layout/header/logo";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import DonateForm from "./donate-form";

interface Props {}

const DonatePageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("donate_page");

  return (
    <SmallSectionContainer className="mt-12 !max-w-5xl">
      <CustomBreadcrumb pages={[{ name: t("heading"), link: "/dong-gop" }]} />

      <div className="flex gap-6 mt-10">
        <div className="bg-white shadow-md rounded-md w-[55%]">
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
            <Logo />

            <p className="text-2xl font-semibold leading-none tracking-tight mb-2 mt-6">
              Your donation will make a difference
            </p>
            <p className="text-sm text-muted-foreground">
              Thank you for your support, trust, and belief in universal access
              to safe water. Every dollar you give will create real change.
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-md w-[55%] border-t border-[#eeeeee]">
          <DonateForm />
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default DonatePageContent;
