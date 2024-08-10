import BannerCarousel from "@/components/home-page/banner-carousel";

import dynamic from "next/dynamic";
import { getBanners } from "@/queries/banners.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import Features from "@/components/home-page/features";

const Introduction = dynamic(
  () => import("@/components/home-page/introduction")
);

const Ingredients = dynamic(() => import("@/components/home-page/ingredients"));

const Testimonials = dynamic(
  () => import("@/components/home-page/testimonials")
);

const JustForYou = dynamic(() => import("@/components/home-page/just-for-you"));

interface Props {
  params: {
    locale: string;
  };
}

const HomePage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const { banners } = await getBanners();

  return (
    <main>
      <BannerCarousel banners={banners} />
      <Introduction />
      <Ingredients />
      <Testimonials />
      <JustForYou />
      <Features />
    </main>
  );
};

export default HomePage;
