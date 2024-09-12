import ListingPageContent from "@/components/pages/listing-page/listing-page-content";
import {
  getAllProducts,
  getBestSellingProducts,
  getNewArrivalsProducts,
  getSaleProducts,
} from "@/queries/products.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    collectionSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";
  const isNewArrivals = params.collectionSlug === "san-pham-moi";
  const isBestSelling = params.collectionSlug === "ban-chay";
  const isSales = params.collectionSlug === "khuyen-mai";

  if (isVi) {
    return {
      title: isNewArrivals
        ? "Sản phẩm mới | Kindle Hope Candles"
        : isBestSelling
        ? "Sản phẩm bán chạy | Kindle Hope Candles"
        : isSales
        ? "Sản phẩm khuyến mãi | Kindle Hope Candles"
        : "Tất cả sản phẩm | Kindle Hope Candles",
      description: isNewArrivals
        ? "Khám phá các loại nến thơm mới nhất vừa ra mắt tại Kindle Hope Candles."
        : isBestSelling
        ? "Xem các loại nến thơm bán chạy nhất tại Kindle Hope Candles được nhiều khách hàng yêu thích."
        : isSales
        ? "Tận hưởng các ưu đãi đặc biệt với các sản phẩm nến thơm đang khuyến mãi tại Kindle Hope Candles."
        : "Xem toàn bộ bộ sưu tập nến thơm độc đáo tại Kindle Hope Candles.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/reset-password`,
      },
    };
  } else {
    return {
      title: isNewArrivals
        ? "New Arrivals | Kindle Hope Candles"
        : isBestSelling
        ? "Best Sellers | Kindle Hope Candles"
        : isSales
        ? "Special Offers | Kindle Hope Candles"
        : "All Products",
      description: isNewArrivals
        ? "Discover the latest scented candles just released at Kindle Hope Candles."
        : isBestSelling
        ? "Explore the top-selling scented candles loved by customers at Kindle Hope Candles."
        : isSales
        ? "Enjoy exclusive deals on discounted scented candles at Kindle Hope Candles."
        : "Browse the entire collection of unique scented candles at Kindle Hope Candles.",
      alternates: {
        canonical: isVi
          ? `${process.env.NEXT_PUBLIC_APP_URL}/vi/bo-suu-tap/${params.collectionSlug}`
          : `${process.env.NEXT_PUBLIC_APP_URL}/en/collections/${
              params.collectionSlug === "san-pham-moi"
                ? "new-releases"
                : params.collectionSlug === "ban-chay"
                ? "best-sellers"
                : params.collectionSlug === "khuyen-mai"
                ? "sale"
                : "all"
            }`,
      },
    };
  }
}

export async function generateStaticParams() {
  const viCollectionsSlugs = [
    { slug: "san-pham-moi" },
    { slug: "ban-chay" },
    { slug: "khuyen-mai" },
    { slug: "tat-ca" },
  ];

  const enCollectionsSlugs = [
    { slug: "new-releases" },
    { slug: "best-sellers" },
    { slug: "sale" },
    { slug: "all" },
  ];

  const viParams = viCollectionsSlugs.map((collection) => ({
    locale: "vi",
    collectionSlug: collection.slug,
  })) as { locale: string; collectionSlug: string }[];

  const enParams = enCollectionsSlugs.map((collection) => ({
    locale: "en",
    collectionSlug: collection.slug,
  })) as { locale: string; collectionSlug: string }[];

  return [...viParams, ...enParams];
}

const CollectionPage: NextPage<Props> = async ({
  params: { locale, collectionSlug },
}: Props) => {
  unstable_setRequestLocale(locale);
  const { category } =
    collectionSlug === "san-pham-moi"
      ? await getNewArrivalsProducts()
      : collectionSlug === "ban-chay"
      ? await getBestSellingProducts()
      : collectionSlug === "khuyen-mai"
      ? await getSaleProducts()
      : await getAllProducts();

  return <ListingPageContent category={category} />;
};

export default CollectionPage;
