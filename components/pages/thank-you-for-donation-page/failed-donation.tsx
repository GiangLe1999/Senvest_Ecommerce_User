import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { CircleAlertIcon, MoveLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const FailedDonation: FC<Props> = (): JSX.Element => {
  const t = useTranslations("thank_you_for_donation_page");

  return (
    <SmallSectionContainer>
      <main className="mt-12 text-center">
        <h1 className="flex items-center gap-3 font-bold text-red-600 text-4xl mb-4 justify-center">
          <CircleAlertIcon className="w-8 h-8" /> {t("failed_heading")}
        </h1>
        <h2 className="text-xl font-bold mb-4">{t("failed_sub_heading")}</h2>
        <ul className="text-muted space-y-2 mb-7">
          <li>{t("failed_item_1")}</li>
          <li>{t("failed_item_2")}</li>
          <li>{t("failed_item_3")} </li>
          <li>
            <Link
              href="/lien-he"
              className="font-bold hover:text-primary transition-colors hover:underline"
            >
              {t("failed_item_4_1")}
            </Link>{" "}
            {t("failed_item_4_2")}
          </li>
        </ul>
        <Link
          href="/"
          className="bg-primary hover:bg-background transition-none text-white px-6 py-3 rounded-sm flex items-center gap-2 w-fit mx-auto"
        >
          <MoveLeftIcon className="w-4 h-4" /> {t("back_to_home")}
        </Link>
      </main>
    </SmallSectionContainer>
  );
};

export default FailedDonation;
