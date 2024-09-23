import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const PaymentMethodsPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("payment_methods_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[{ name: t("heading"), link: "/phuong-thuc-thanh-toan" }]}
      />

      <h1 className="text-3xl font-bold mt-6 capitalize mb-3 text-primary">
        {t("heading")}
      </h1>

      <div className="prose max-w-none">
        <p>{t("sapo")}</p>

        <h2 className="mt-6 mb-2">{t("p_1_heading")}</h2>
        <p>
          {t.rich("p_1_sapo_1", {
            b: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
        </p>

        {t.rich("p_1_sapo_2", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li>{chunks}</li>,
          b: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}

        <h3 className="mt-6 mb-2">{t("p_1_subheading_1")}</h3>
        {t.rich("p_1_p_1_content", {
          ol: (chunks) => <ol className="space-y-2 mt-2">{chunks}</ol>,
          li: (chunks) => <li className="">{chunks}</li>,
        })}

        <h3 className="mt-6 mb-2">{t("p_1_subheading_2")}</h3>
        {t.rich("p_1_p_2_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="">{chunks}</li>,
          b: (chunks) => <strong className="font-bold">{chunks}</strong>,
          a: (chunks) => (
            <Link href="/dong-gop" target="_blank" className="font-bold">
              {chunks}
            </Link>
          ),
        })}

        <h3 className="mt-6 mb-2">{t("p_1_subheading_3")}</h3>
        {t.rich("p_1_p_3_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_2_heading")}</h2>
        <p>
          {t.rich("p_2_sapo", {
            b: (chunks) => <strong className="font-bold">{chunks}</strong>,
          })}
        </p>

        <h3 className="mt-6 mb-2">{t("p_2_subheading_1")}</h3>
        {t.rich("p_2_p_1_content", {
          ol: (chunks) => <ol className="space-y-2 mt-2">{chunks}</ol>,
          li: (chunks) => <li>{chunks}</li>,
          b: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}

        <h3 className="mt-6 mb-2">{t("p_2_subheading_2")}</h3>
        {t.rich("p_2_p_2_content", {
          ol: (chunks) => <ol className="space-y-2 mt-2">{chunks}</ol>,
          li: (chunks) => <li>{chunks}</li>,
          b: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}

        <h2 className="mt-6 mb-2">{t("p_3_heading")}</h2>
        {t.rich("p_3_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_4_heading")}</h2>
        {t.rich("p_4_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="">{chunks}</li>,
        })}

        <h2 className="mt-6 mb-2">{t("p_5_heading")}</h2>
        <p>{t("p_5_sapo")}</p>
        {t.rich("p_5_content", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="">{chunks}</li>,
          b: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}

        <h2 className="mt-6 mb-2">{t("p_6_heading")}</h2>
        <p>{t("p_6_content_1")}</p>
        {t.rich("p_6_content_2", {
          ul: (chunks) => <ul className="space-y-2 mt-2">{chunks}</ul>,
          li: (chunks) => <li className="">{chunks}</li>,
          b: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}
        <p>{t("p_6_content_3")}</p>
      </div>
    </SmallSectionContainer>
  );
};

export default PaymentMethodsPageContent;
