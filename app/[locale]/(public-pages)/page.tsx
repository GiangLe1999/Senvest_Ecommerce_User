import dynamic from "next/dynamic";
import { getBanners } from "@/queries/banners.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
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

const Features = dynamic(() => import("@/components/pages/home-page/features"));

const Products = dynamic(() => import("@/components/pages/home-page/products"));

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Kindle Hope Candles - Nến Thơm Thắp Sáng Hy Vọng Và Chia Sẻ"
      : "Kindle Hope Candles - Fragrant Candles that Illuminate with Hope and Giving",
    description: isVi
      ? "Nến thơm thân thiện môi trường mang lại sự ấm áp và góp phần cho các hoạt động từ thiện. Thắp nến, lan tỏa hy vọng."
      : "Fragrant eco-friendly candles that warm your home while supporting charitable causes. Light a candle, spread hope.",
    alternates: {
      canonical: process.env.NEXT_PUBLIC_APP_URL,
    },
    openGraph: {
      images: "",
    },
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
