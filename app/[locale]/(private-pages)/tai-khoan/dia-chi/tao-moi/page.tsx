import AddAddressPageContent from "@/components/pages/add-address-page/add-address-page-content";
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
      ? "Tạo địa chỉ mới | Kindle Hope Candles"
      : "Create New Address | Kindle Hope Candles",
    description: isVi
      ? "Thêm địa chỉ giao hàng mới vào tài khoản của bạn để mua sắm thuận tiện tại Kindle Hope Candles."
      : "Add a new shipping address to your account for seamless shopping at Kindle Hope Candles.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "tai-khoan/dia-chi/tao-moi" : "account/addresses/add"
      }`,
    },
  };
}

const AddAddressPage: NextPage<Props> = async ({
  params: { locale },
}: Props) => {
  unstable_setRequestLocale(locale);

  return <AddAddressPageContent />;
};

export default AddAddressPage;
