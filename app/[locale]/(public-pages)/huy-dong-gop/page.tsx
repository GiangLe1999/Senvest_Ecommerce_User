import { cancelDonationLink } from "@/actions/donation.actions";
import CancelDonation from "@/components/pages/cancel-donation-page/cancel-donation";
import { redirect } from "@/configs/i18n-navigation";
import { Metadata, NextPage } from "next";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Hủy đóng góp | Kindle Hope Candles"
      : "Cancel Donation | Kindle Hope Candles",
    description: isVi
      ? "Bạn đã hủy đóng góp, hy vọng sẽ đồng hành cùng bạn trong các dự án cộng đồng sắp tới."
      : "You have canceled your donation. We hope to collaborate with you in future community projects.",
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
