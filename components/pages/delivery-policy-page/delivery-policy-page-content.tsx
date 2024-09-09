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
        <p>{t("p_1_content_1")}</p>
        <p>{t("p_1_content_2")}</p>

        <h2 className="mt-6 mb-2">{t("p_2_heading")}</h2>
        <p>{t("p_2_content_1")}</p>
        <p>{t("p_2_content_2")}</p>

        <h2 className="mt-6 mb-2">{t("p_3_heading")}</h2>
        {t.rich("p_3_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_4_heading")}</h2>
        {t.rich("p_4_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_5_heading")}</h2>
        <p>{t("p_5_content")}</p>

        <h2 className="mt-6 mb-2">{t("p_6_heading")}</h2>
        <p>{t("p_6_content")}</p>

        <h2 className="mt-6 mb-2">{t("p_7_heading")}</h2>
        {t.rich("p_7_content", {
          a: (chunks) => (
            <Link
              href="/chinh-sach-bao-mat"
              className="text-primary font-bold underline"
              target="_blank"
            >
              {chunks}
            </Link>
          ),
        })}

        <h2 className="mt-6 mb-2">{t("p_8_heading")}</h2>
        <p>{t("p_8_content")}</p>

        <h2 className="mt-6 mb-2">{t("p_9_heading")}</h2>
        <p>{t("p_9_content")}</p>
      </div>
    </SmallSectionContainer>
  );
};

export default TermsAndConditionsPageContent;
