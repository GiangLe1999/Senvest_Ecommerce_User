import type { Metadata } from "next";
import { Philosopher } from "next/font/google";
import { Grey_Qo } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/providers";
import { unstable_setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";
import { Cart } from "@/components/cart";
import NewPaymentNotification from "@/components/new-payment-notification";
import NewDonationNotification from "@/components/new-donation-notification";

const philosopher = Philosopher({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

const grey_qo = Grey_Qo({
  subsets: ["vietnamese"],
  weight: ["400"],
  variable: "--font-grey-qo",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const locales = ["vi", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      {/* <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicons/favicon-16x16.png"
      /> */}
      <Providers locale={locale}>
        <body
          className={cn(
            grey_qo.variable,
            philosopher.className,
            philosopher.variable,
            "relative"
          )}
        >
          <Header />
          {children}
          <Footer />
          <Cart />
          <NewPaymentNotification />
          <NewDonationNotification />
        </body>
      </Providers>
    </html>
  );
}
