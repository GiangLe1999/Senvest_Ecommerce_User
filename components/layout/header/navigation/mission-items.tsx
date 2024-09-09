import { Link } from "@/configs/i18n-navigation";
import useMountAnimation from "@/hooks/useMountAnimation";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  showMissionItems: boolean;
  setShowMissionItems: Dispatch<SetStateAction<boolean>>;
}

const MissionItems: FC<Props> = ({
  setShowMissionItems,
  showMissionItems,
}): JSX.Element => {
  const t = useTranslations("navigation");

  const { visible, handleAnimationEnd } = useMountAnimation({
    show: showMissionItems,
  });

  return (
    <nav
      className={`bg-white border shadow-md py-2 px-4 absolute top-full left-0 w-max rounded-sm transition-opacity ${
        showMissionItems
          ? "opacity-100 animate-fade-in"
          : "opacity-0 animate-fade-out"
      } ${visible ? "block" : "hidden"}`}
      onMouseEnter={() => setShowMissionItems(true)}
      onMouseLeave={() => setShowMissionItems(false)}
      onAnimationEnd={handleAnimationEnd}
    >
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

export default MissionItems;
