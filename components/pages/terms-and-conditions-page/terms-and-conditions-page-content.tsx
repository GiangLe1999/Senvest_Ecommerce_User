import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const TermsAndConditionsPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("terms_and_conditions_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[{ name: t("heading"), link: "/dieu-khoan-va-dieu-kien" }]}
      />

      <h1 className="text-3xl font-bold mt-6 capitalize mb-3 text-primary">
        {t("heading")}
      </h1>

      <div className="prose max-w-none">
        {t("sapo")}

        <h2 className="mt-6 mb-2">{t("p_1_heading")}</h2>
        <h3 className="mt-6 mb-2">{t("p_1_subheading_1")}</h3>
        {t.rich("p_1_p_1_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h3 className="mt-6 mb-2">{t("p_1_subheading_2")}</h3>
        {t.rich("p_1_p_2_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_2_heading")}</h2>
        <h3 className="mt-6 mb-2">{t("p_2_subheading_1")}</h3>
        {t("p_2_p_1_content")}

        <h3 className="mt-6 mb-2">{t("p_2_subheading_2")}</h3>
        {t.rich("p_2_p_2_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_3_heading")}</h2>
        {t.rich("p_3_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_4_heading")}</h2>
        <h3 className="mt-6 mb-2">{t("p_4_subheading_1")}</h3>
        {t.rich("p_4_p_1_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h3 className="mt-6 mb-2">{t("p_4_subheading_3")}</h3>
        {t.rich("p_4_p_3_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
          b: (chunks) => <strong>{chunks}</strong>,
        })}

        <h2 className="mt-6 mb-2">{t("p_5_heading")}</h2>
        <h3 className="mt-6 mb-2">{t("p_5_subheading_1")}</h3>
        {t.rich("p_5_p_1_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h3 className="mt-6 mb-2">{t("p_5_subheading_2")}</h3>
        {t.rich("p_5_p_2_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}
      </div>
    </SmallSectionContainer>
  );
};

export default TermsAndConditionsPageContent;
