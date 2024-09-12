import FailedDonation from "@/components/pages/thank-you-for-donation-page/failed-donation";
import PendingDonation from "@/components/pages/thank-you-for-donation-page/pending-donation";
import ThankYouForDonationPageContent from "@/components/pages/thank-you-for-donation-page/thank-you-for-donation-page-content";
import { redirect } from "@/configs/i18n-navigation";
import { StatusEnum } from "@/entities/payment.entity";
import { getDonation } from "@/queries/donation.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
  };
  searchParams: {
    orderCode: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Cảm ơn bạn đã quyên góp! | Kindle Hope Candles"
      : "Thank You for Your Donation! | Kindle Hope Candles",
    description: isVi
      ? "Cảm ơn bạn đã đóng góp cho quỹ từ thiện! Mỗi khoản quyên góp đều lan tỏa yêu thương. "
      : "Thank you for supporting our charity! Your donation spreads love and hope.",
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
