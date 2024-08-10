import Image from "next/image";
import { FC } from "react";
import SmallSectionContainer from "../small-section-container";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Link } from "@/configs/i18n-navigation";
import { MoveRightIcon } from "lucide-react";

interface Props {}

const JustForYou: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("home_page.just_for_you");

  return (
    <section>
      <SmallSectionContainer className="py-[90px]">
        <div className="flex items-center gap-[100px]">
          <Image
            src="/home-page/section-6-bg.webp"
            alt="Section 5 image"
            width={550}
            height={630}
            className="rounded-sm"
          />

          <div className="flex-1">
            <p className="text-5xl text-primary font-grey_qo mb-4">
              {t("sub_heading")}
            </p>
            <h2 className="text-4xl mb-6">{t("heading")}</h2>
            <ul className="mb-8 space-y-3 text-lg">
              <li>{t("line_1")}</li>
              <li>{t("line_2")}</li>
              <li>{t("line_3")}</li>
            </ul>

            <Button>
              <Link className="flex items-center" href="/">
                {t("discovery")}
                <MoveRightIcon className="w-3 h-3 ml-2" />
              </Link>
            </Button>

            <Image
              className="ml-auto"
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
