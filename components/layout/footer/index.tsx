import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import Subscribe from "./subscribe";
import Image from "next/image";

interface Props {}

const navItems = [
  {
    title: "about_us",
    url: "/ve-chung-toi",
  },
  {
    title: "contact_us",
    url: "/lien-he",
  },
  {
    title: "delivery",
    url: "/chinh-sach-van-chuyen",
  },
  {
    title: "terms",
    url: "/dieu-khoan-va-dieu-kien",
  },
  {
    title: "privacy_policy",
    url: "/chinh-sach-bao-mat",
  },
  {
    title: "payment_methods",
    url: "/phuong-thuc-thanh-toan",
  },
  {
    title: "faqs",
    url: "/faqs",
  },
];

const Footer: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-secondary mt-16">
      <SmallSectionContainer>
        <nav className="border-b">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  className="lg:py-10 py-4 px-4 block hover:text-primary transition-colors"
                  href={item.url as any}
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Subscribe />

        <div className="lg:py-6 py-4 text-sm text-muted sm:text-left text-center">
          <Link
            href={"http://online.gov.vn/Home/WebDetails/123390" as any}
            target="_blank"
            className="px-4 w-fit"
          >
            <Image
              src="/logo-da-thong-bao-bo-cong-thuong.webp"
              alt="Bộ Công Thương"
              width={180}
              height={70}
              className="mx-auto"
            />
          </Link>

          <div className="mb-3">
            <div className="flex flex-wrap items-center gap-3 justify-center mt-4 mb-3">
              <p>
                {t("dkkd")}: <b className="text-foreground">0318649406</b>
              </p>
              {/* <span className="text-gray-300">|</span>
              <p>
                {t("issue_date")}: <b className="text-foreground">30/08/2024</b>
              </p> */}
            </div>

            <p className="text-center mb-3">
              {t("issue_company_1")}:{" "}
              <b className="text-foreground">{t("issue_company_2")}</b>
            </p>

            <p className="text-center">
              {t("address_1")}:{" "}
              <b className="text-foreground">{t("address_2")}</b>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {t("copyright")} <span className="text-gray-300">|</span>{" "}
            <a
              href="tel:+:84779741998"
              className="font-bold text-lg text-foreground hover:text-primary transition-colors"
            >
              (+84) 779741998
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="mailto:kindlehopecandles@gmail.com"
              className="hover:text-primary transition-colors"
            >
              kindlehopecandles@gmail.com
            </a>
          </div>
        </div>
      </SmallSectionContainer>
    </footer>
  );
};

export default Footer;
