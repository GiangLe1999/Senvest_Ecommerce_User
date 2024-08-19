import { Pathnames } from "next-intl/navigation";

export const defaultLocale = "vi" as const;
export const locales = ["vi", "en"] as const;

export const pathnames = {
  "/": { vi: "/", en: "/" },
  "/danh-muc/[categorySlug]": {
    vi: "/danh-muc/[categorySlug]",
    en: "/category/[categorySlug]",
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
  "/dong-gop": {
    vi: "/dong-gop",
    en: "/donate",
  },
  "/faqs": {
    vi: "/faqs",
    en: "/faqs",
  },
  "/blog": {
    vi: "/blog",
    en: "/blog",
  },
  "/lien-he": {
    vi: "/lien-he",
    en: "/contact",
  },
  "/dang-nhap": {
    vi: "/dang-nhap",
    en: "/login",
  },
  "/dang-ki": {
    vi: "/dang-ki",
    en: "/register",
  },
  "/quen-mat-khau": {
    vi: "/quen-mat-khau",
    en: "/forgot-password",
  },
  "/reset-password/[token]": {
    vi: "/reset-password",
    en: "/reset-password",
  },
  "/tai-khoan": {
    vi: "/tai-khoan",
    en: "/account",
  },
  "/tai-khoan/thong-tin": {
    vi: "/tai-khoan/thong-tin",
    en: "/account/profile",
  },
  "/tai-khoan/dia-chi": {
    vi: "/tai-khoan/dia-chi",
    en: "/account/addresses",
  },
  "/tai-khoan/dia-chi/tao-moi": {
    vi: "/tai-khoan/dia-chi/tao-moi",
    en: "/account/addresses/add",
  },
  "/tai-khoan/dia-chi/cap-nhat/[addressId]": {
    vi: "/tai-khoan/dia-chi/cap-nhat",
    en: "/account/addresses/update",
  },
  "/tai-khoan/lich-su-mua-hang": {
    vi: "/tai-khoan/lich-su-mua-hang",
    en: "/account/order-history",
  },
  "/tai-khoan/hoa-don-tra-hang": {
    vi: "/tai-khoan/hoa-don-tra-hang",
    en: "/account/credit-slips",
  },
  "/tai-khoan/gdpr": {
    vi: "/tai-khoan/gdpr",
    en: "/account/gdpr",
  },
  "/tai-khoan/san-pham-yeu-thich": {
    vi: "/tai-khoan/san-pham-yeu-thich",
    en: "/account/wishlist",
  },
  "/san-pham/[productSlug]": {
    vi: "/san-pham/[productSlug]",
    en: "/product/[productSlug]",
  },
  "/gio-hang": {
    vi: "/gio-hang",
    en: "/cart",
  },
  "/thanh-toan": {
    vi: "/thanh-toan",
    en: "/checkout",
  },
  "/cam-on": {
    vi: "/cam-on",
    en: "/thank-you",
  },
  "/vi-tri-cua-hang": {
    vi: "/vi-tri-cua-hang",
    en: "/store-location",
  },
  "/dieu-kien-dieu-khoan": {
    vi: "/dieu-kien-dieu-khoan",
    en: "/terms-and-conditions",
  },
  "/chinh-sach-bao-mat": {
    vi: "/chinh-sach-bao-mat",
    en: "/privacy-policy",
  },
  "/van-chuyen": {
    vi: "/van-chuyen",
    en: "/delivery",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
