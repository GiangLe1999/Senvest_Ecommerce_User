import { locales } from "@/configs/i18n-configs";
import NextAuthProvider from "@/contexts/next-auth-provider";
import NextIntlProvider from "@/contexts/next-intl-provider";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
  locale: string;
}

const Providers: FC<Props> = (props: Props) => {
  const { children, locale } = props;

  return (
    <NextAuthProvider>
      <NextIntlProvider locale={locale}>{children}</NextIntlProvider>
    </NextAuthProvider>
  );
};

export default Providers;
