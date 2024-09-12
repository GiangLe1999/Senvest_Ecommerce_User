import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import SmallSectionContainer from "@/components/small-section-container";

interface Props {}

const data = [
  {
    heading: "feature_1_heading",
    description: "feature_1_description",
    icon: "/home-page/section-7-icon-1.webp",
  },
  {
    heading: "feature_2_heading",
    description: "feature_2_description",
    icon: "/home-page/section-7-icon-2.webp",
  },
  {
    heading: "feature_3_heading",
    description: "feature_3_description",
    icon: "/home-page/section-7-icon-3.webp",
  },
  {
    heading: "feature_4_heading",
    description: "feature_4_description",
    icon: "/home-page/section-7-icon-4.webp",
  },
];

const Features: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("home_page.features");

  return (
    <section>
      <SmallSectionContainer className="lg:py-[90px] py-[40px]">
        <div className="grid lg:grid-cols-4 grid-cols-2">
          {data.map((feature, index) => (
            <div
              key={feature.heading}
              className={cn(
                "flex flex-col items-center gap-2",
                index !== 0 && "border-l",
                index === 0 || index === 2 ? "pr-4" : "pl-4"
              )}
            >
              <div className="h-[60px]">
                <Image
                  src={feature.icon}
                  alt={feature.heading}
                  width={51}
                  height={61}
                  className={cn(
                    "rounded-sm",
                    index === 2 || index === 3 ? "lg:mt-0 mt-10" : ""
                  )}
                />
              </div>
              <div className="text-center">
                <h3
                  className={cn(
                    "lg:text-xl text-lg mb-1",
                    index === 2 || index === 3 ? "lg:mt-0 mt-10" : ""
                  )}
                >
                  {t(feature.heading)}
                </h3>
                <p className="lg:text-base text-sm text-muted">
                  {t(feature.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SmallSectionContainer>
    </section>
  );
};

export default Features;
