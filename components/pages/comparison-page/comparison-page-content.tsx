import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import ComparisonTable from "./comparison-table";

interface Props {}

const ComparisonPageContent: FC<Props> = (): JSX.Element => {
  const t = useTranslations("comparison_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb pages={[{ name: t("heading"), link: "/so-sanh" }]} />

      <h1 className="text-xl font-bold my-8 capitalize">{t("heading")}</h1>

      <ComparisonTable />
    </SmallSectionContainer>
  );
};

export default ComparisonPageContent;
