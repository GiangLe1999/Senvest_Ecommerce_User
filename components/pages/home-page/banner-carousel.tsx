"use client";

import { FC } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Banner } from "@/entities/banner.entity";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/configs/i18n-navigation";
import { MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  banners: Banner[];
}

const BannerCarousel: FC<Props> = ({ banners }): JSX.Element => {
  const t = useTranslations("home_page.banner_carousel");

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
    >
      <CarouselContent>
        {banners?.map((banner, index) => (
          <CarouselItem
            key={index}
            className="relative w-full aspect-[2.32] group"
          >
            <Image
              key={index}
              src={banner.image}
              alt={"Banner" + index}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
              priority={index === 0}
            />

            <div className="absolute xl:top-[25%] sm:top-[20%] top-[8%] lg:left-[12.5%] left-[8%]">
              <p className="font-grey_qo text-primary lg:text-5xl sm:text-3xl text-2xl lg:mb-6 mb-2">
                {t("sub_heading")}
              </p>
              <div className="lg:text-5xl sm:text-3xl text-2xl lg:mb-4 mb-2">
                {t("heading_line_1")} <br />
                {t("heading_line_2")}
              </div>
              <p className="text-muted lg:mb-6 mb-4 lg:text-base text-sm sm:max-w-none max-w-[60%]">
                {t("description")}
              </p>
              <Button className="sm:block hidden">
                <Link className="flex items-center" href={banner.image as any}>
                  {t("button")}
                  <MoveRightIcon className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>

            <CarouselPrevious className="absolute text-foreground opacity-0 top-1/2 left-10 -translate-y-1/2 bg-white border-none group-hover:opacity-100 lg:group-hover:left-8 group-hover:left-3 transition-all" />
            <CarouselNext className="absolute text-foreground opacity-0 top-1/2 right-10 -translate-y-1/2 bg-white border-none group-hover:opacity-100 lg:group-hover:right-8 group-hover:right-0 transition-all" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BannerCarousel;
