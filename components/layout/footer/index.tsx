import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import Subscribe from "./subscribe";

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

        <div className="lg:py-10 py-4 text-sm text-muted flex flex-wrap items-center justify-center gap-3 sm:text-left text-center">
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
      </SmallSectionContainer>
    </footer>
  );
};

export default Footer;
