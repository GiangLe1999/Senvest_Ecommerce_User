import { createPaymentLink } from "@/actions/payment.actions";
import CustomLoadingButton from "@/components/custom-loading-button";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/entities/cart-product.entity";
import { NotUserInfo } from "@/entities/not-user-info-entity";
import { UserAddress } from "@/entities/user-address.entity";
import { formatCurrencyVND } from "@/lib/utils";
import { Session } from "next-auth";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "sonner";

interface Props {
  t: any;
  cart: CartProduct[];
  session: Session | null;
  notUserInfo: NotUserInfo | undefined;
  userAddresses: UserAddress[] | null;
  userAddressId: string | undefined;
  totalItems: number;
  totalPrice: number;
}

const PaymentProcess: FC<Props> = ({
  t,
  session,
  notUserInfo,
  userAddresses,
  userAddressId,
  totalItems,
  totalPrice,
  cart,
}): JSX.Element => {
  const chosenUserAddress = userAddresses?.find(
    (address) => address._id === userAddressId
  );

  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  const createPaymentLinkHandler = async () => {
    try {
      setLoading(true);
      const res = await createPaymentLink({
        locale,
        amount: totalPrice,
        description: "TT nen thom KHC",
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
          locale === "vi" ? "thanh-toan" : "checkout"
        }`,
        returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
          locale === "vi" ? "cam-on" : "thank-you"
        }`,
        not_user_info: notUserInfo,
        user_address: userAddressId,
        items: cart?.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          variant_id: item.variant_id,
        })),
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = res.data.checkoutUrl;
      } else {
        setLoading(false);
        return toast.error("Tạo link thất bại", {
          description: "Tạo link thất bại",
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error("Tạo link thất bại", {
        description: "Tạo link thất bại",
      });
    }
  };

  return (
    <div className="bg-white p-5 border shadow-md rounded-sm">
      <p className="font-bold text-2xl text-primary mb-4">
        {t("review_order")}
      </p>

      <div>
        <h2 className="font-bold mb-3">{t("details")}</h2>
        {notUserInfo ? (
          <ul className="space-y-2 text-xs text-muted list-disc ml-4">
            <li>
              <strong>{t("name")}: </strong>
              {notUserInfo?.name}
            </li>
            <li>
              <strong>Email: </strong>
              {notUserInfo?.email}
            </li>
            <li>
              <strong>{t("phone")}: </strong>
              {notUserInfo?.phone}
            </li>
            <li>
              <strong>{t("address")}: </strong>
              {notUserInfo?.address}
            </li>
            <li>
              <strong>{t("city")}: </strong>
              {notUserInfo?.city}, {notUserInfo?.province} {notUserInfo?.zip}
            </li>
            <li>
              <strong>{t("total_items")}: </strong>
              {totalItems}
            </li>
            <li>
              <strong>{t("total_price")}: </strong>
              {formatCurrencyVND(totalPrice)}
            </li>
          </ul>
        ) : (
          <ul className="space-y-2 text-xs text-muted list-disc ml-4">
            <li className="mt-2">
              <strong>{t("name")}: </strong>
              {chosenUserAddress?.name}
            </li>
            <li>
              <strong>Email: </strong>
              {session?.user?.email}
            </li>
            <li>
              <strong>{t("phone")}: </strong>
              {chosenUserAddress?.phone}
            </li>
            <li>
              <strong>{t("address")}: </strong>
              {chosenUserAddress?.address}
            </li>
            <li>
              <strong>{t("city")}: </strong>
              {chosenUserAddress?.city}, {chosenUserAddress?.province}{" "}
              {chosenUserAddress?.zip}
            </li>
            <li>
              <strong>{t("total_items")}: </strong>
              {totalItems}
            </li>
            <li>
              <strong>{t("total_price")}: </strong>
              {formatCurrencyVND(totalPrice)}
            </li>
          </ul>
        )}
      </div>

      <div className="mt-4">
        <h2 className="font-bold mb-3">{t("payment_methods")}</h2>
        <Image
          src="/checkout-page/accepted-payment-methods.png"
          alt="Accepted payment methods"
          width={1219}
          height={426}
        />

        <div className="mt-5 text-center">
          <CustomLoadingButton
            loading={loading}
            onClick={createPaymentLinkHandler}
            content={t("complete_order")}
          />
        </div>

        <p className="text-muted italic mt-4 text-center text-xs">
          {t("payment_note")}
        </p>
      </div>
    </div>
  );
};

export default PaymentProcess;
