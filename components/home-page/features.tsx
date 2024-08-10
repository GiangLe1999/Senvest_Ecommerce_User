import { FC } from "react";
import SmallSectionContainer from "../small-section-container";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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
      <SmallSectionContainer className="py-[90px]">
        <div className="grid grid-cols-4">
          {data.map((feature, index) => (
            <div
              key={feature.heading}
              className={cn(
                "flex flex-col items-center gap-2",
                index !== 0 && " border-l"
              )}
            >
              <div className="h-[60px]">
                <Image
                  src={feature.icon}
                  alt={feature.heading}
                  width={51}
                  height={61}
                  className="rounded-sm"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl mb-1">{t(feature.heading)}</h3>
                <p className="text-muted">{t(feature.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </SmallSectionContainer>
    </section>
  );
};

export default Features;
