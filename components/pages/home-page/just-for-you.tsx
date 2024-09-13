import Image from "next/image";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/configs/i18n-navigation";
import { MoveRightIcon } from "lucide-react";
import SmallSectionContainer from "@/components/small-section-container";
import { Button } from "@/components/ui/button";

interface Props {}

const JustForYou: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("home_page.just_for_you");

  return (
    <section>
      <SmallSectionContainer className="lg:py-[90px] py-[60px]">
        <div className="lg:flex items-center gap-[100px]">
          <div className="relative lg:w-1/2 w-full aspect-[0.87]">
            <Image
              src="/home-page/section-6-bg.webp"
              alt="Section 5 image"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="rounded-sm"
            />
          </div>

          <div className="flex-1 lg:mt-0 mt-6">
            <p className="lg:text-5xl text-4xl text-primary font-grey_qo mb-4">
              {t("sub_heading")}
            </p>
            <h2 className="lg:text-4xl text-3xl mb-6">{t("heading")}</h2>
            <ul className="mb-8 space-y-3 lg:text-lg text-base">
              <li>{t("line_1")}</li>
              <li>{t("line_2")}</li>
              <li>{t("line_3")}</li>
            </ul>

            <Button>
              <Link className="flex items-center" href="/">
                {t("discovery")}
                <MoveRightIcon className="w-3 h-3 ml-1" />
              </Link>
            </Button>

            <Image
              className="ml-auto lg:block hidden"
              src="/home-page/section-6-img.jpg"
              alt="Section 6 image"
              width={331}
              height={312}
            />
          </div>
        </div>
      </SmallSectionContainer>
    </section>
  );
};

export default JustForYou;
