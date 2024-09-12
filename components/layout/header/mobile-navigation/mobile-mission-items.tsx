import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const MobileMissionItems: FC<Props> = (): JSX.Element => {
  const t = useTranslations("navigation");

  return (
    <nav>
      <ul className="text-muted text-[13px] space-y-1">
        <li className="py-1 mb-1 hover:text-primary transition-colors">
          <Link href="/su-menh">{t("mission_vs_impact")}</Link>
        </li>
        <li className="py-1 my-1 hover:text-primary transition-colors">
          <Link href="/dong-gop">{t("donate")}</Link>
        </li>
        <li className="py-1 my-1 hover:text-primary transition-colors">
          <Link href="/faqs">FAQs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMissionItems;
