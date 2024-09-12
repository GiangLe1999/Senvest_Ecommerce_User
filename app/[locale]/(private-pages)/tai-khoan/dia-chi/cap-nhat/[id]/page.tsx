import UpdateAddressPageContent from "@/components/pages/update-address-page/update-address-page-content";
import { UserAddress } from "@/entities/user-address.entity";
import { getUserAddress } from "@/queries/user-addresses.queries";
import { Metadata, NextPage } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: {
    locale: string;
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isVi = params.locale === "vi";

  return {
    title: isVi
      ? "Cập nhật thông tin địa chỉ | Kindle Hope Candles"
      : "Update Address Information | Kindle Hope Candles",
    description: isVi
      ? "Thay đổi và cập nhật thông tin địa chỉ giao hàng của bạn một cách dễ dàng tại Kindle Hope Candles."
      : "Easily edit and update your shipping address information on your Kindle Hope Candles account.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/${
        isVi
          ? `tai-khoan/dia-chi/cap-nhat/${params.id}`
          : `account/addresses/update/${params.id}`
      }`,
    },
  };
}

export async function generateStaticParams({ params }: Props) {
  const { data } = await getUserAddress(params.id);

  return data.map((address: UserAddress) => ({
    id: address._id,
    locale: params.locale,
  }));
}

const UpdateAddressPage: NextPage<Props> = async ({
  params: { locale, id },
}: Props) => {
  unstable_setRequestLocale(locale);

  const { data } = await getUserAddress(id);

  return <UpdateAddressPageContent address={data} />;
};

export default UpdateAddressPage;
