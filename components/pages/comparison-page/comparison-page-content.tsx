import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SectionContainer from "@/components/section-container";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const ComparisonPageContent: FC<Props> = (): JSX.Element => {
  const t = useTranslations("comparison_page");

  return (
    <SectionContainer>
      <SmallSectionContainer>
        <CustomBreadcrumb pages={[{ name: t("heading"), link: "/so-sanh" }]} />
      </SmallSectionContainer>
    </SectionContainer>
  );
};

export default ComparisonPageContent;
