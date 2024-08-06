import { defaultLocale, pathnames, localePrefix } from "@/configs/i18n-configs";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["vi", "en"],
  defaultLocale,
  pathnames,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en)/:path*"],
};
