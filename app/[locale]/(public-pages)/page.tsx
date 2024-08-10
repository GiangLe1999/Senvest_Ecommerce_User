import BannerCarousel from "@/components/home-page/banner-carousel";
import { getBanners } from "@/queries/banners.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

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
    </main>
  );
};

export default HomePage;
