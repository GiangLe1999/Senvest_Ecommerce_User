"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import Autoplay from "embla-carousel-autoplay";

interface Props {}

const data = [
  {
    content: "testimonial_1",
    author: "testimonial_1_author",
  },
  {
    content: "testimonial_2",
    author: "testimonial_2_author",
  },
];

const TestimonialsCarousel: React.FC<Props> = () => {
  const t = useTranslations("home_page.testimonials");

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 8000,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((testimonial, index) => (
          <CarouselItem key={index}>
            <p className="text-center max-w-[800px] mx-auto italic lg:text-xl text-lg mb-4">
              “{t(testimonial.content)}”
            </p>
            <p className="text-center text-muted">{t(testimonial.author)}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TestimonialsCarousel;
