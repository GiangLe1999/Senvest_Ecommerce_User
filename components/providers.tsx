import NextAuthProvider from "@/contexts/next-auth-provider";
import NextIntlProvider from "@/contexts/next-intl-provider";
import TanstackQueryProvider from "@/contexts/tanstack-query-provider";
import { FC } from "react";
import CustomToaster from "./custom-toaster";

interface Props {
  children: React.ReactNode;
  locale: string;
}

const Providers: FC<Props> = (props: Props) => {
  const { children, locale } = props;

  return (
    <NextAuthProvider>
      <NextIntlProvider locale={locale}>
        <TanstackQueryProvider>
          {children}
          <CustomToaster />
        </TanstackQueryProvider>
      </NextIntlProvider>
    </NextAuthProvider>
  );
};

export default Providers;
