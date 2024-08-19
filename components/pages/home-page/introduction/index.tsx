import { FC } from "react";
import SmallSectionContainer from "@/components/small-section-container";
import VideoDialog from "./video-dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/configs/i18n-navigation";
import { MoveRightIcon } from "lucide-react";

interface Props {}

const Introduction: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("home_page.introduction");

  return (
    <section>
      <div className="bg-[url('/home-page/section-2-pattern.png')] bg-auto bg-no-repeat bg-left-bottom">
        <SmallSectionContainer className="py-[90px]">
          <div className="grid grid-cols-2 gap-[30px]">
            <VideoDialog />

            <div className="pl-[109px] flex flex-col justify-between">
              <Image
                src="/home-page/section-2-img-1.webp"
                alt="Section 2 image 1"
                width={520}
                height={520}
                className="rounded-sm"
              />
              <h2 className="text-3xl text-right">
                {t("heading_1_line_1")} <br />
                {t("heading_1_line_2")}
              </h2>
            </div>

            <div className="space-y-4">
              <h2 className="font-grey_qo text-5xl text-primary">
                {t("about_us")}
              </h2>
              <h3 className="text-4xl">{t("heading_2")}</h3>
              <h4 className="text-xl">{t("sub_heading_2")}</h4>
              <p className="text-muted">{t("description_2")}</p>

              <Button className="!mt-8">
                <Link className="flex items-center" href="/">
                  {t("discovery")}
                  <MoveRightIcon className="w-3 h-3 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="pl-[109px]">
              <Image
                src="/home-page/section-2-img-2.webp"
                alt="Section 2 image 2"
                width={520}
                height={520}
                className="rounded-sm"
              />
              <h2 className="text-3xl mt-9">
                {t("heading_3_line_1")} <br />
                {t("heading_3_line_2")}
              </h2>
            </div>
          </div>
        </SmallSectionContainer>
      </div>
    </section>
  );
};

export default Introduction;
