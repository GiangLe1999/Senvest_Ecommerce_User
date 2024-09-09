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
          <ul className="flex items-center justify-center gap-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  className="py-10 px-4 block hover:text-primary transition-colors"
                  href={item.url as any}
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Subscribe />

        <div className="py-10 text-sm text-muted flex items-center justify-center gap-3">
          {t("copyright")} <span className="text-gray-300">|</span>{" "}
          <a
            href="tel:+84962334807"
            className="font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            (+84) 962 334 807
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="mailto:info@kindlehopecandles.com"
            className="hover:text-primary transition-colors"
          >
            info@kindlehopecandles.com
          </a>
        </div>
      </SmallSectionContainer>
    </footer>
  );
};

export default Footer;
