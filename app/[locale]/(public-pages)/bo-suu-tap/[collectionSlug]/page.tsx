import ListingPageContent from "@/components/pages/listing-page/listing-page-content";
import {
  getAllProducts,
  getBestSellingProducts,
  getNewArrivalsProducts,
  getSaleProducts,
} from "@/queries/products.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    collectionSlug: string;
  };
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
