import CartPageContent from "@/components/pages/cart-page/cart-page-content";
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
      ? "Giỏ hàng của bạn | Kindle Hope Candles"
      : "Your Shopping Cart | Kindle Hope Candles",
    description: isVi
      ? "Xem lại các sản phẩm đã chọn và sẵn sàng thanh toán."
      : "Review your selected items and get ready to checkout.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/${
        isVi ? "gio-hang" : "cart"
      }`,
    },
  };
}

const CartPage: NextPage<Props> = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return <CartPageContent />;
};

export default CartPage;
