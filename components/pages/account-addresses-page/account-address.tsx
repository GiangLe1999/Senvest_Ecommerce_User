"use client";

import { deleteUserAddress } from "@/actions/user-addresses.actions";
import WarningDialog from "@/components/warning-dialog";
import { Link } from "@/configs/i18n-navigation";
import { UserAddress } from "@/entities/user-address.entity";
import { PencilRulerIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";

interface Props {
  address: UserAddress;
  order: number;
}

const AccountAddress: FC<Props> = ({ address, order }): JSX.Element => {
  const t = useTranslations("account_addresses_page");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteAddressHandler = async () => {
    try {
      setLoading(true);
      const res = await deleteUserAddress(address._id);
      if (res.ok) {
        setLoading(false);
        toast.success(t("delete_success"), {
          description: `${t("delete_success_desc")}.`,
        });

        setOpenDeleteDialog(false);
        window.location.reload();
      } else {
        setLoading(false);
        return toast.error(t("delete_fail"), {
          description: t("delete_fail_1_desc"),
        });
      }
    } catch (error) {
      setLoading(false);
      return toast.error(t("delete_fail"), {
        description: t("delete_fail_2_desc"),
      });
    }
  };

  return (
    <>
      <article className="custom-card-shadow rounded-sm">
        <div className="p-5">
          <h4 className="font-bold mb-1">
            {address?.alias || `${t("my_address")} ${order}`}
          </h4>
          <address className="text-[13px] not-italic text-muted min-h-[144px]">
            {address.name} <br /> {address.address} <br /> {address.city},{" "}
            {address.province} {address.zip} <br />
            {t("vietnam")} <br />
            {address.phone}
          </address>
        </div>
        <div className="border-t py-2 px-5 flex items-center gap-4 text-sm">
          <Link
            className="flex items-center gap-1 text-emerald-600 hover:underline"
            href={`/tai-khoan/dia-chi/cap-nhat/${address._id}` as any}
          >
            <PencilRulerIcon className="w-3 h-3" />
            {t("update")}
          </Link>

          <button
            type="button"
            className="flex items-center gap-1 text-red-600 hover:underline"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <TrashIcon className="w-3 h-3" /> {t("delete")}
          </button>
        </div>
      </article>

      <WarningDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        confirm_btn_content={t("delete")}
        confirm_btn_action={deleteAddressHandler}
        loading={loading}
        heading="Delete address"
        description="Are you sure you want to delete this address?"
      />
    </>
  );
};

export default AccountAddress;
