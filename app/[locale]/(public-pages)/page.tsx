import BannerCarousel from "@/components/home-page/banner-carousel";

import dynamic from "next/dynamic";
import { getBanners } from "@/queries/banners.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

const Introduction = dynamic(
  () => import("@/components/home-page/introduction")
);

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
    </main>
  );
};

export default HomePage;
