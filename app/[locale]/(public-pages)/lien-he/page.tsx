import ContactPageContent from "@/components/pages/contact-page/contact-page-content";
import { authOptions } from "@/lib/auth";
import { getUserPayments } from "@/queries/user-payment.queries";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const ContactPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const session = await getServerSession(authOptions);
  const data = session ? await getUserPayments() : null;

  return <ContactPageContent session={session} payments={data?.payments} />;
};

export default ContactPage;
