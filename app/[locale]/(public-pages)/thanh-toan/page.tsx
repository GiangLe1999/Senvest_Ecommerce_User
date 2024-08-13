import CheckoutPageContent from "@/components/pages/checkout-page/checkout-page-content";
import { authOptions } from "@/lib/auth";
import { getUserAddresses } from "@/queries/user-addresses.queries";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
}

const CheckoutPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const session = await getServerSession(authOptions);
  const userAddresses = session ? await getUserAddresses() : null;

  return (
    <CheckoutPageContent
      session={session}
      userAdddresses={userAddresses?.data ?? null}
    />
  );
};

export default CheckoutPage;
