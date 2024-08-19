import dynamic from "next/dynamic";
import { getBanners } from "@/queries/banners.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import Features from "@/components/pages/home-page/features";
import { getHomepageProducts } from "@/queries/products.queries";
import BannerCarousel from "@/components/pages/home-page/banner-carousel";

const Introduction = dynamic(
  () => import("@/components/pages/home-page/introduction")
);

const Ingredients = dynamic(
  () => import("@/components/pages/home-page/ingredients")
);

const Testimonials = dynamic(
  () => import("@/components/pages/home-page/testimonials")
);

const JustForYou = dynamic(
  () => import("@/components/pages/home-page/just-for-you")
);

const Products = dynamic(() => import("@/components/pages/home-page/products"));

interface Props {
  params: {
    locale: string;
  };
}

const HomePage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const { banners } = await getBanners();
  const { products } = await getHomepageProducts();

  return (
    <>
      <BannerCarousel banners={banners} />
      <Introduction />
      <Products products={products} />
      <Ingredients />
      <Testimonials />
      <JustForYou />
      <Features />
    </>
  );
};

export default HomePage;
