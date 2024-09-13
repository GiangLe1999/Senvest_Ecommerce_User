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
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
            <VideoDialog />

            <div className="lg:pl-[109px] pl-0 flex flex-col justify-between">
              <div className="relative w-full aspect-square">
                <Image
                  src="/home-page/section-2-img-1.webp"
                  alt="Section 2 image 1"
                  className="rounded-sm"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h2 className="mt-4">
                <p className="lg:block hidden text-3xl text-right">
                  {t("heading_1_line_1")} <br />
                  {t("heading_1_line_2")}
                </p>
                <p className="lg:hidden block text-2xl">
                  {t("heading_1_line_1")} {t("heading_1_line_2")}
                </p>
              </h2>
            </div>

            <div className="space-y-4">
              <h2 className="font-grey_qo lg:text-5xl text-4xl text-primary">
                {t("about_us")}
              </h2>
              <h3 className="lg:text-4xl text-3xl">{t("heading_2")}</h3>
              <h4 className="lg:text-xl text-lg">{t("sub_heading_2")}</h4>
              <p className="text-muted lg:text-base text-sm">
                {t("description_2")}
              </p>

              <Button className="!mt-8">
                <Link className="flex items-center" href="/">
                  {t("discovery")}
                  <MoveRightIcon className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="lg:pl-[109px] pl-0">
              <div className="relative w-full aspect-square">
                <Image
                  src="/home-page/section-2-img-2.webp"
                  alt="Section 2 image 2"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-sm"
                />
              </div>
              <h2 className="lg:mt-9 mt-4">
                <p className="lg:block hidden text-3xl text-right">
                  {t("heading_3_line_1")} <br />
                  {t("heading_3_line_2")}
                </p>
                <p className="lg:hidden block text-2xl">
                  {t("heading_3_line_1")} {t("heading_3_line_2")}
                </p>
              </h2>
            </div>
          </div>
        </SmallSectionContainer>
      </div>
    </section>
  );
};

export default Introduction;
