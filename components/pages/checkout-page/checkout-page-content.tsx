"use client";

import { Session } from "next-auth";
import { FC, useState } from "react";
import ChooseAddress from "./choose-address";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { NotUserInfo } from "@/entities/not-user-info-entity";
import { UserAddress } from "@/entities/user-address.entity";
import CheckoutItems from "./checkout-items";
import { useCartStore } from "@/stores/useCartStore";
import PaymentProcess from "./payment-process";

interface Props {
  session: Session | null;
  userAdddresses: UserAddress[] | null;
}

const CheckoutPageContent: FC<Props> = ({
  session,
  userAdddresses,
}): JSX.Element => {
  const t = useTranslations("checkout_page");
  const { cart, totalItems, totalPrice } = useCartStore((state) => state);

  const [content, setContent] = useState<"adddress" | "payment">("adddress");

  const [notUserInfo, setNotUserInfo] = useState<NotUserInfo>();
  const [userAddressId, setUserAddressId] = useState<string>();

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[
          { name: t("breadcrumb_1"), link: "/gio-hang" },
          { name: t("breadcrumb_2"), link: "/thanh-toan" },
        ]}
      />

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          {content === "adddress" ? (
            <ChooseAddress
              session={session}
              t={t}
              setNotUserInfo={setNotUserInfo}
              setUserAddressId={setUserAddressId}
              setContent={setContent}
              userAdddresses={userAdddresses}
            />
          ) : (
            <PaymentProcess
              t={t}
              session={session}
              notUserInfo={notUserInfo}
              userAddresses={userAdddresses}
              userAddressId={userAddressId}
              totalItems={totalItems}
              totalPrice={totalPrice}
              cart={cart}
            />
          )}
        </div>

        <div className="col-span-4">
          <CheckoutItems
            cart={cart}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </SmallSectionContainer>
  );
};

export default CheckoutPageContent;
