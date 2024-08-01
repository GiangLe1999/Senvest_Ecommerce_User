import { locales } from "@/configs/i18n-configs";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
  locale: string;
}

const NextIntlProvider: FC<Props> = (props) => {
  const { children, locale } = props;
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
