import { Pathnames } from "next-intl/navigation";

export const defaultLocale = "vi" as const;
export const locales = ["vi", "en"] as const;

export const pathnames = {
  "/": "/",
  "/danh-muc/[categorySlug]": {
    vi: "/danh-muc/[categorySlug]",
    en: "/categories/[categorySlug]",
  },
  "/cua-hang": {
    vi: "/cua-hang",
    en: "/shop",
  },
  "/bo-suu-tap/tat-ca": {
    vi: "/bo-suu-tap/tat-ca",
    en: "/collections/all",
  },
  "/bo-suu-tap/san-pham-moi": {
    vi: "/bo-suu-tap/san-pham-moi",
    en: "/collections/new-releases",
  },
  "/bo-suu-tap/ban-chay": {
    vi: "/bo-suu-tap/ban-chay",
    en: "/collections/best-sellers",
  },
  "/bo-suu-tap/khuyen-mai": {
    vi: "/bo-suu-tap/khuyen-mai",
    en: "/collections/sale",
  },
  "/mui-huong/[scentSlug]": {
    vi: "/mui-huong/[scentSlug]",
    en: "/scent/[scentSlug]",
  },

  "/ve-chung-toi": {
    vi: "/ve-chung-toi",
    en: "/about-us",
  },
  "/su-menh": {
    vi: "/su-menh",
    en: "/mission",
  },
  "/blog": {
    vi: "/blog",
    en: "/blog",
  },
  "/lien-he": {
    vi: "/lien-he",
    en: "/tin-tuc",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
