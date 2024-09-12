import SmallSectionContainer from "@/components/small-section-container";
import { Link } from "@/configs/i18n-navigation";
import { LoaderIcon, MoveLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const PendingPayment: FC<Props> = (): JSX.Element => {
  const t = useTranslations("thank_you_page");

  return (
    <SmallSectionContainer>
      <main className="mt-12 text-center">
        <h1 className="flex items-center gap-3 font-bold text-yellow-700 lg:text-4xl text-2xl mb-4 justify-center flex-wrap">
          <LoaderIcon className="lg:w-8 lg:h-8 w-6 h-6 animate-spin" />{" "}
          {t("pending_heading")}
        </h1>
        <h2 className="lg:text-xl text-base font-bold mb-4">
          {t("pending_sub_heading")}
        </h2>
        <ul className="text-muted space-y-2 mb-7 lg:text-base text-sm">
          <li>{t("pending_item_1")}</li>
          <li>{t("pending_item_2")}</li>
          <li>{t("pending_item_3")} </li>
          <li>
            <Link
              href="/lien-he"
              className="font-bold hover:text-primary transition-colors hover:underline"
            >
              {t("pending_item_4_1")}
            </Link>{" "}
            {t("pending_item_4_2")}
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

export default PendingPayment;
