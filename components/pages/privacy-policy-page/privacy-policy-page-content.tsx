import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import FaqPageAccordion from "./faq-page-accordion";

interface Props {}

const FAQPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("faq_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb pages={[{ name: t("heading"), link: "/faqs" }]} />

      <h1 className="text-3xl font-bold capitalize mb-3 text-primary text-center mt-10">
        {t("heading")}
      </h1>
      <div className="max-w-4xl mx-auto text-center text-muted mb-12">
        <p>{t("desc_1")}</p>
        <p>
          {t("desc_2")} <span className="font-bold">{t("desc_3")}</span>
        </p>
        <p></p>
      </div>

      <FaqPageAccordion />
    </SmallSectionContainer>
  );
};

export default FAQPageContent;
