import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Button } from "@/components/ui/button";
import { Link } from "@/configs/i18n-navigation";
import { cn } from "@/lib/utils";
import {
  FlowerIcon,
  HeartIcon,
  LeafIcon,
  MessageSquareMoreIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import Articles from "./articles";

interface Props {
  articles: any[];
}

const statistics = [
  {
    number: "$1M+",
    description: "fund_raised",
  },
  {
    number: "500+",
    description: "volunteers",
  },
  {
    number: "100%",
    description: "delivered_donations",
  },
  {
    number: "250K",
    description: "charity_participation",
  },
];

const MissionPageContent: FC<Props> = ({ articles }): JSX.Element => {
  const t = useTranslations("mission_page");

  return (
    <>
      <SmallSectionContainer className="mt-12">
        <CustomBreadcrumb pages={[{ name: t("heading"), link: "/su-menh" }]} />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 mt-10">
          <h1 className="lg:text-5xl text-4xl font-bold capitalize mb-3">
            <div className="lg:block flex gap-x-1 flex-wrap">
              <p className="mb-1">
                {t("giving")} <span className="text-primary">{t("hope")}</span>,
              </p>
              <p>
                {t("creating")}{" "}
                <span className="text-primary">{t("impact")}</span>
              </p>
            </div>
          </h1>

          <div>
            <p className="mb-4 text-sm">{t("sub_title")}</p>

            <div className="flex items-center gap-4">
              <Button>
                <Link href="/dong-gop">{t("donate")}</Link>
              </Button>

              <Button variant="link" className="underline text-foreground">
                <Link href="/dong-gop">{t("learn")}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[2.7] mt-8">
          <Image
            src="/mission-page/banner-1.jpg"
            alt="Banner 1"
            fill
            sizes="100vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="grid sm:grid-cols-4 grid-cols-2 mt-6">
          {statistics.map((statistic, index) => (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4",
                index !== 3 ? "border-r" : "",
                index === 1 && "sm:border-r border-r-0"
              )}
              key={index}
            >
              <p className="lg:text-3xl text-2xl font-bold text-primary text-center sm:mt-0 mt-5">
                {statistic.number}
              </p>
              <p className="text-center sm:line-clamp-2 line-clamp-1 lg:text-base text-sm">
                {t(statistic.description)}
              </p>
            </div>
          ))}
        </div>
      </SmallSectionContainer>
      <div className="bg-secondary mt-16">
        <SmallSectionContainer>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 py-14">
            <div>
              <div className="mb-4">
                <div className="relative w-full aspect-[2]">
                  <Image
                    src="/mission-page/banner-2.webp"
                    alt="Banner 2"
                    fill
                    sizes="100vw"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="sm:col-span-1 col-span-3 bg-primary/80 rounded-md text-white w-full h-full p-4 flex flex-col justify-between gap-1">
                  <HeartIcon className="w-6 h-6" />
                  <div>
                    <p className="text-white text-4xl font-bold mb-2">50%</p>
                    <p className="text-sm">{t("of_worldwide")}</p>
                    <p className="text-sm">{t("dont_have")}</p>
                  </div>
                </div>
                <div className="sm:col-span-2 col-span-3 relative w-full aspect-[2]">
                  <Image
                    src="/mission-page/banner-3.jpg"
                    alt="Banner 3"
                    fill
                    sizes="100vw"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="font-bold lg:text-4xl text-3xl mb-3">
                {t("heading_2_1")}
              </h2>
              <p className="text-muted mb-4 lg:text-base text-sm">
                {t("sub_heading_1")}
              </p>

              <Button
                variant="link"
                className="underline pl-0 w-fit lg:text-base text-sm"
              >
                <Link href="/dong-gop">{t("learn")}</Link>
              </Button>
            </div>
          </div>
        </SmallSectionContainer>
      </div>

      <SmallSectionContainer className="mt-10">
        <h2 className="font-bold lg:text-4xl text-3xl mb-2">
          {t("heading_2_2")}
        </h2>
        <div className="flex justify-between items-center gap-2 lg:text-base text-sm flex-wrap">
          <p className="text-muted lg:mb-4 mb-2">{t("sub_heading_2_2")}</p>

          <Button
            variant="link"
            className="underline pl-0 pt-0 w-fit lg:text-base text-sm"
          >
            <Link
              href={process.env.NEXT_PUBLIC_BLOG_BASE_URL as any}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("see_all")}
            </Link>
          </Button>
        </div>

        <Articles articles={articles} />
      </SmallSectionContainer>

      <div className="bg-secondary mt-16">
        <SmallSectionContainer>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-14 py-14">
            <div>
              <h2 className="font-bold lg:text-4xl text-3xl mb-8">
                {t("heading_2_3")}
              </h2>

              <ul className="space-y-6">
                <li className="flex items-center gap-4 bg-[#fcfaf9] shadow-sm px-4 py-3 rounded-lg">
                  <div className="rounded-lg bg-[#F2A55D] grid place-items-center w-14 h-14 shrink-0">
                    <FlowerIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("issue_1")}</h4>
                    <p className="text-muted text-[13px]">
                      {t("issue_1_desc")}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-4 bg-[#fcfaf9] shadow-sm px-4 py-3 rounded-lg">
                  <div className="rounded-lg bg-[#4E667A] grid place-items-center w-14 h-14 shrink-0">
                    <LeafIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("issue_2")}</h4>
                    <p className="text-muted text-[13px]">
                      {t("issue_2_desc")}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-4 bg-[#fcfaf9] shadow-sm px-4 py-3 rounded-lg">
                  <div className="rounded-lg bg-[#F2A55D] grid place-items-center w-14 h-14 shrink-0">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("issue_3")}</h4>
                    <p className="text-muted text-[13px]">
                      {t("issue_3_desc")}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-4 bg-[#fcfaf9] shadow-sm px-4 py-3 rounded-lg">
                  <div className="rounded-lg bg-[#4E667A] grid place-items-center w-14 h-14 shrink-0">
                    <MessageSquareMoreIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t("issue_4")}</h4>
                    <p className="text-muted text-[13px]">
                      {t("issue_4_desc")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative w-full aspect-square">
              <Image
                src="/mission-page/banner-4.jpg"
                alt="Banner 4"
                fill
                sizes="100vw"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </SmallSectionContainer>
      </div>

      <SmallSectionContainer className="mt-16">
        <div className="rounded-lg bg-white shadow border-t border-[#eeeeee] pb-8">
          <div className="relative w-full aspect-[2.7]">
            <Image
              src="/mission-page/banner-5.jpg"
              alt="Banner 5"
              fill
              sizes="100vw"
              className="object-cover rounded-t-lg"
            />
            <div className="absolute bg-white rounded-full top-4 left-5 text-xs font-bold px-4 py-2">
              {t("beach_cleanup")}
            </div>
          </div>

          <div className="px-6">
            <h2 className="font-bold lg:text-4xl text-3xl mb-2  text-center mt-6">
              <span>{t("join_the")}</span>
              <span className="text-primary">{t("hope_revolution")}</span>
              <span>{t("today")}</span>
            </h2>
            <p className="lg:text-base text-sm text-muted text-center mb-7">
              {t("sub_heading_2_4")}
            </p>

            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Kindle Hope Candles Logo"
                width={100}
                height={75.19}
                priority
                className="mx-auto"
              />
            </Link>
          </div>
        </div>
      </SmallSectionContainer>
    </>
  );
};

export default MissionPageContent;
