"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Slogan } from "@/entities/slogan.entity";
import { useLocale } from "next-intl";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  slogans: Slogan[];
}

const SloganCarousel: React.FC<Props> = ({ slogans }) => {
  const locale = useLocale();

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {slogans?.map((slogan, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex items-center h-10 justify-center">
              <p className="text-white text-center line-clamp-1 xl:text-base lg:text-sm text-xs">
                {locale === "en" ? slogan.content.en : slogan.content.vi}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SloganCarousel;
