import ContactPageContent from "@/components/pages/contact-page/contact-page-content";
import { authOptions } from "@/lib/auth";
import { getUserPayments } from "@/queries/user-payment.queries";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";
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
      ? "Liên hệ | Kindle Hope Candles"
      : "Contact Us | Kindle Hope Candles",
    description: isVi
      ? "Liên hệ với chúng tôi để được hỗ trợ. Chúng tôi luôn sẵn sàng giúp đỡ bạn!"
      : "Reach out for any inquiries or support. We're here to assist you!",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "lien-he" : "contact"
      }`,
    },
  };
}

const ContactPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const session = await getServerSession(authOptions);
  const data = session ? await getUserPayments() : null;

  return <ContactPageContent session={session} payments={data?.payments} />;
};

export default ContactPage;
