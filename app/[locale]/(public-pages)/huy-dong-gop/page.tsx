import { cancelDonationLink } from "@/actions/donation.actions";
import CancelDonation from "@/components/pages/cancel-donation-page/cancel-donation";
import { redirect } from "@/configs/i18n-navigation";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    orderCode: string;
    status: string;
  };
}

const CancelDonationPage: NextPage<Props> = async ({
  params: { locale },
  searchParams: { orderCode, status },
}: Props) => {
  unstable_setRequestLocale(locale);

  if (!orderCode && status !== "CANCELLED") {
    return redirect("/");
  }

  await cancelDonationLink({ orderCode });

  return <CancelDonation />;
};

export default CancelDonationPage;
