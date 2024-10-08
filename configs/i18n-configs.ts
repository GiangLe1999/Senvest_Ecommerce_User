import { Pathnames } from "next-intl/navigation";

export const defaultLocale = "vi" as const;
export const locales = ["vi", "en"] as const;

export const pathnames = {
  "/": { vi: "/", en: "/" },
  "/danh-muc/[categorySlug]": {
    vi: "/danh-muc/[categorySlug]",
    en: "/category/[categorySlug]",
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
    vi: "/reset-password/[token]",
    en: "/reset-password/[token]",
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
  "/tai-khoan/dia-chi/cap-nhat/[id]": {
    vi: "/tai-khoan/dia-chi/cap-nhat/[id]",
    en: "/account/addresses/update/[id]",
  },
  "/tai-khoan/lich-su-mua-hang": {
    vi: "/tai-khoan/lich-su-mua-hang",
    en: "/account/order-history",
  },
  "/tai-khoan/lich-su-mua-hang/[paymentCode]": {
    vi: "/tai-khoan/lich-su-mua-hang/[paymentCode]",
    en: "/account/order-history/[paymentCode]",
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
  "/so-sanh": {
    vi: "/so-sanh",
    en: "/compare",
  },
  "/thanh-toan": {
    vi: "/thanh-toan",
    en: "/checkout",
  },
  "/cam-on": {
    vi: "/cam-on",
    en: "/thank-you",
  },
  "/huy-thanh-toan": {
    vi: "/huy-thanh-toan",
    en: "/cancel-payment",
  },
  "/cam-on-da-dong-gop": {
    vi: "/cam-on-da-dong-gop",
    en: "/thank-you-for-your-donation",
  },
  "/huy-dong-gop": {
    vi: "/huy-dong-gop",
    en: "/cancel-donation",
  },
  "/vi-tri-cua-hang": {
    vi: "/vi-tri-cua-hang",
    en: "/store-location",
  },
  "/dieu-khoan-va-dieu-kien": {
    vi: "/dieu-khoan-va-dieu-kien",
    en: "/terms-and-conditions",
  },
  "/chinh-sach-bao-mat": {
    vi: "/chinh-sach-bao-mat",
    en: "/privacy-policy",
  },
  "/chinh-sach-van-chuyen": {
    vi: "/chinh-sach-van-chuyen",
    en: "/delivery-policy",
  },
  "/phuong-thuc-thanh-toan": {
    vi: "/phuong-thuc-thanh-toan",
    en: "/payment-methods",
  },
  "/tim-kiem/[keyword]": {
    vi: "/tim-kiem/[keyword]",
    en: "/search/[keyword]",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
