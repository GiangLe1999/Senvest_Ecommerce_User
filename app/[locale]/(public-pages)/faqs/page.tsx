import FAQPageContent from "@/components/pages/faq-page/faq-page-content";
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
      ? "Câu hỏi thường gặp | Kindle Hope Candles"
      : "Frequently Asked Questions | Kindle Hope Candles",
    description: isVi
      ? "Giải đáp mọi thắc mắc về sản phẩm và dịch vụ của chúng tôi."
      : "Find answers to all your questions about our products and services.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "dong-gop" : "donate"
      }`,
    },
  };
}

const FAQPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <FAQPageContent />;
};

export default FAQPage;
