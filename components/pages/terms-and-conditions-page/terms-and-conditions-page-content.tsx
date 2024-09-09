import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const DeliveryPolicyPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("delivery_policy_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[{ name: t("heading"), link: "/chinh-sach-van-chuyen" }]}
      />

      <h1 className="text-3xl font-bold mt-6 capitalize mb-3 text-primary">
        {t("heading")}
      </h1>

      <div className="prose max-w-none">
        {t("sapo")}

        <h2 className="mt-6 mb-2">{t("p_1_heading")}</h2>
        {t("p_1_content")}

        <h2 className="mt-6 mb-2">{t("p_2_heading")}</h2>
        {t.rich("p_2_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
          bold: (chunks) => (
            <strong className="font-bold text-primary">{chunks}</strong>
          ),
        })}

        <h2 className="mt-6 mb-2">{t("p_3_heading")}</h2>
        {t.rich("p_3_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
          bold: (chunks) => (
            <strong className="font-bold text-primary">{chunks}</strong>
          ),
        })}

        <h2 className="mt-6 mb-2">{t("p_4_heading")}</h2>
        {t.rich("p_4_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
          bold: (chunks) => (
            <strong className="font-bold text-primary">{chunks}</strong>
          ),
        })}

        <h2 className="mt-6 mb-2">{t("p_5_heading")}</h2>
        {t.rich("p_5_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
          bold: (chunks) => (
            <strong className="font-bold text-primary">{chunks}</strong>
          ),
        })}

        <h2 className="mt-6 mb-2">{t("p_6_heading")}</h2>
        {t.rich("p_6_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="list-disc">{chunks}</li>,
          bold: (chunks) => (
            <strong className="font-bold text-primary">{chunks}</strong>
          ),
        })}

        {t("p_7")}
      </div>
    </SmallSectionContainer>
  );
};

export default DeliveryPolicyPageContent;
