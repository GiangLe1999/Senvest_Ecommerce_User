import { useTranslations } from "next-intl";
import { FC } from "react";
import TestimonialsCarousel from "./testimonials-carousel";
import SmallSectionContainer from "@/components/small-section-container";

interface Props {}

const Testimonials: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("home_page.testimonials");

  return (
    <section>
      <div className="bg-[url('/home-page/section-5-bg.jpg')] bg-no-repeat bg-center py-[90px]">
        <SmallSectionContainer>
          <p className="text-5xl text-primary text-center font-grey_qo mb-4">
            {t("sub_heading")}
          </p>
          <h2 className="text-4xl text-center mb-8">{t("heading")}</h2>
          <TestimonialsCarousel />
        </SmallSectionContainer>
      </div>
    </section>
  );
};

export default Testimonials;
