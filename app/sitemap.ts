import { defaultLocale, locales } from "@/configs/i18n-configs";
import { getPathname } from "@/configs/i18n-navigation";
import type { MetadataRoute } from "next";

const host = process.env.NEXT_PUBLIC_APP_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  // Adapt this as necessary
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

    // getEntry({
    //   pathname: '/users/[id]',
    //   params: {id: '1'}
    // }),
    // getEntry({
    //   pathname: '/users/[id]',
    //   params: {id: '2'}
    // })
  ];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntry(href: Href) {
  return {
    url: getUrl(href, defaultLocale),
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
