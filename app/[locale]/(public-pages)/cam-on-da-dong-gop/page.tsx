import FailedDonation from "@/components/pages/thank-you-for-donation-page/failed-donation";
import PendingDonation from "@/components/pages/thank-you-for-donation-page/pending-donation";
import ThankYouForDonationPageContent from "@/components/pages/thank-you-for-donation-page/thank-you-for-donation-page-content";
import FailedPayment from "@/components/pages/thank-you-page/failed-payment";
import PendingPayment from "@/components/pages/thank-you-page/pending-payment";
import { redirect } from "@/configs/i18n-navigation";
import { StatusEnum } from "@/entities/payment.entity";
import { getDonation } from "@/queries/donation.queries";
import { NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    orderCode: string;
  };
}

const ThankyouForDonationPage: NextPage<Props> = async ({
  params: { locale },
  searchParams: { orderCode },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { data } = await getDonation({ orderCode });

  if (!data) {
    return redirect("/");
  }

  if (data.status === StatusEnum.paid) {
    return <ThankYouForDonationPageContent />;
  }

  if (data.status === StatusEnum.cancelled) {
    return <FailedDonation />;
  }

  return <PendingDonation />;
};

export default ThankyouForDonationPage;
