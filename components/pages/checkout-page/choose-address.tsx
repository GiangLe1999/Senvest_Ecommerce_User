import { Session } from "next-auth";
import { Dispatch, FC, SetStateAction } from "react";
import NotUserAddressForm from "./not-user-address-form";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/configs/i18n-navigation";
import { NotUserInfo } from "@/entities/not-user-info-entity";
import { UserAddress } from "@/entities/user-address.entity";
import UserAddresses from "./user-addresses";

interface Props {
  session: Session | null;
  t: any;
  setNotUserInfo: Dispatch<SetStateAction<NotUserInfo | undefined>>;
  setContent: Dispatch<SetStateAction<"adddress" | "payment">>;
  userAdddresses: UserAddress[] | null;
  setUserAddressId: Dispatch<SetStateAction<string | undefined>>;
}

const ChooseAddress: FC<Props> = ({
  session,
  t,
  setNotUserInfo,
  setContent,
  userAdddresses,
  setUserAddressId,
}): JSX.Element => {
  const locale = useLocale();

  return (
    <div className="bg-white p-5 border shadow-md rounded-sm">
      <p className="font-bold text-2xl text-primary mb-2">
        {session ? t("heading_1") : t("heading_2")}
      </p>
      <p className="text-sm text-muted">
        {session ? (
          t("heading_1_desc")
        ) : (
          <>
            {t("heading_2_desc_part_1")}
            <strong className="text-primary underline">
              <Link
                href={
                  `/dang-nhap?next=/${locale}/${
                    locale === "vi" ? "thanh-toan" : "checkout"
                  }` as any
                }
              >
                {t("heading_2_desc_part_2")}
              </Link>
            </strong>{" "}
            {t("heading_2_desc_part_3")}
          </>
        )}
      </p>

      {session ? (
        <UserAddresses
          userAdddresses={userAdddresses}
          locale={locale}
          setUserAddressId={setUserAddressId}
          setContent={setContent}
        />
      ) : (
        <NotUserAddressForm
          setNotUserInfo={setNotUserInfo}
          setContent={setContent}
        />
      )}
    </div>
  );
};

export default ChooseAddress;
