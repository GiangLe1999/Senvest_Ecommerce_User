import DonatePageContent from "@/components/pages/donate-page/donate-page-content";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Đóng góp cho cộng đồng | Kindle Hope Candles"
      : "Contributions to the Community | Kindle Hope Candles",
    description: isVi
      ? "Cùng chúng tôi lan tỏa yêu thương qua những đóng góp của bạn!"
      : "Join us in spreading love through your generous contributions!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "dong-gop" : "donate"
      }`,
    },
  };
}

const DonatePage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <DonatePageContent />;
};

export default DonatePage;
