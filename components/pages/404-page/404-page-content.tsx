import { Link } from "@/configs/i18n-navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const NotFoundPageContent: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("404_page");

  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-primary text-2xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {t("description")}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-background transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("go_back_home")}
          </Link>
          <Link href="/lien-he" className="text-sm font-semibold text-gray-900">
            {t("contact_support")}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPageContent;
