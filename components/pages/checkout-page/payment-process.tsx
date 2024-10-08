import { createPaymentLink } from "@/actions/payment.actions";
import CustomLoadingButton from "@/components/custom-loading-button";
import { CartProduct } from "@/entities/cart-product.entity";
import { NotUserInfo } from "@/entities/not-user-info-entity";
import { UserAddress } from "@/entities/user-address.entity";
import { cn, formatCurrencyVND } from "@/lib/utils";
import { Session } from "next-auth";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/configs/i18n-navigation";

interface Props {
  t: any;
  cart: CartProduct[];
  session: Session | null;
  notUserInfo: NotUserInfo | undefined;
  userAddresses: UserAddress[] | null;
  userAddressId: string | undefined;
  totalItems: number;
  totalPrice: number;
  discountedByCoupon: {
    code: string;
    value: number;
  };
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
  discountedByCoupon,
}): JSX.Element => {
  const chosenUserAddress = userAddresses?.find(
    (address) => address._id === userAddressId
  );

  const [agreeState, setAgreeState] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  const createPaymentLinkHandler = async () => {
    setSubmitted(true);
    if (!agreeState) {
      return;
    }

    try {
      setLoading(true);

      const isAppliedCoupon =
        discountedByCoupon.code && discountedByCoupon.value > 0;

      const res = await createPaymentLink({
        locale,
        amount: totalPrice - (isAppliedCoupon ? discountedByCoupon.value : 0),
        description: "TT nen thom KHC",
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${
          locale === "vi" ? "huy-thanh-toan" : "cancel-payment"
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
        ...(isAppliedCoupon && {
          coupon_code: discountedByCoupon.code,
        }),
      });
      if (res.ok) {
        setLoading(false);
        window.location.href = res.data.checkoutUrl;
      } else {
        setLoading(false);
        return toast.error(t("create_link_fail"), {
          description: res.error,
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("create_link_fail"), {
        description: t("create_link_fail_desc"),
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

        <div className="flex items-center mt-6 space-x-2">
          <Checkbox
            id="terms"
            checked={agreeState}
            onCheckedChange={() => setAgreeState(!agreeState)}
            className={cn(
              "accent-primary",
              submitted && !agreeState && "border-red-500"
            )}
          />
          <label
            htmlFor="terms"
            className={cn(
              "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
              submitted && !agreeState && "text-red-500"
            )}
          >
            {t("agree_1")}
            <Link
              href="/dieu-khoan-va-dieu-kien"
              className={cn(
                "underline font-bold",
                submitted && !agreeState ? "text-red-500" : "text-primary "
              )}
            >
              {t("agree_2")}
            </Link>
            {t("agree_3")}
          </label>
        </div>
        {submitted && !agreeState && (
          <p className="text-red-500 text-xs ml-6 mt-2">{t("agree_error")}</p>
        )}

        <p className="text-muted italic mt-4 text-xs">{t("payment_note")}</p>

        <div className="mt-5 text-center">
          <CustomLoadingButton
            loading={loading}
            onClick={createPaymentLinkHandler}
            content={t("complete_order")}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
