import SmallSectionContainer from "@/components/small-section-container";
import { useTranslations } from "next-intl";
import { FC } from "react";
import NoAccountAddresses from "./no-account-addresses";
import { UserAddress } from "@/entities/user-address.entity";
import AccountAddress from "./account-address";

interface Props {
  addresses: UserAddress[];
}

const AccountAddressesList: FC<Props> = ({ addresses }): JSX.Element => {
  const t = useTranslations("account_addresses_page");

  return (
    <SmallSectionContainer>
      <h1 className="text-xl font-bold my-8">{t("heading")}</h1>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-3 gap-[30px]">
          {addresses.map((address, index) => (
            <AccountAddress
              key={address._id}
              address={address}
              order={index + 1}
            />
          ))}
        </div>
      ) : (
        <NoAccountAddresses />
      )}
    </SmallSectionContainer>
  );
};

export default AccountAddressesList;
