/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")("./configs/i18n.ts");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vietqr.io",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
