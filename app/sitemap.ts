import { defaultLocale, locales } from "@/configs/i18n-configs";
import { getPathname } from "@/configs/i18n-navigation";
import { getCategoriesForNavigation } from "@/queries/categories.queries";
import { getAllProducts } from "@/queries/products.queries";
import type { MetadataRoute } from "next";

const host = process.env.NEXT_PUBLIC_APP_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories } = (await getCategoriesForNavigation()) as any;
  const categoryEntries = categories.map((category: any) => ({
    url: `${host}/vi/danh-muc/${category.slug.vi}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        vi: `${host}/vi/danh-muc/${category.slug.vi}`,
        en: `${host}/en/category/${category.slug.en}`,
      },
    },
  }));

  const {
    category: { products },
  } = await getAllProducts();
  const productEntries = products.map((product: any) => ({
    url: `${host}/vi/san-pham/${product.slug.vi}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        vi: `${host}/vi/san-pham/${product.slug.vi}`,
        en: `${host}/en/product/${product.slug.en}`,
      },
    },
  }));

  return [
    getEntry("/"),
    getEntry("/blog"),
    getEntry("/bo-suu-tap/ban-chay"),
    getEntry("/bo-suu-tap/khuyen-mai"),
    getEntry("/bo-suu-tap/san-pham-moi"),
    getEntry("/bo-suu-tap/tat-ca"),
    getEntry("/chinh-sach-bao-mat"),
    getEntry("/chinh-sach-van-chuyen"),
    getEntry("/dieu-khoan-va-dieu-kien"),
    getEntry("/dong-gop"),
    getEntry("/faqs"),
    getEntry("/lien-he"),
    getEntry("/phuong-thuc-thanh-toan"),
    getEntry("/su-menh"),
    ...categoryEntries,
    ...productEntries,
  ];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntry(href: Href) {
  return {
    url: getUrl(href, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(href, locale)])
      ),
    },
  };
}

function getUrl(href: Href, locale: (typeof locales)[number]) {
  const pathname = getPathname({ locale, href });
  return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
}
