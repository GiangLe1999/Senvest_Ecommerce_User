import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  className?: string;
}

const Empty: FC<Props> = ({ className }) => {
  const t = useTranslations("common");
  return (
    <div
      className={`px-3 pt-10 flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <Image src="/icons/empty.svg" alt="Empty box" width={100} height={100} />
      <h5 className="font-bold text-lg">{t("empty_heading")}</h5>
      <span className="text-sm text-muted">{t("empty_description")}</span>
    </div>
  );
};

export default Empty;
