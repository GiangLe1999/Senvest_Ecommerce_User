import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {}

const CartTableHeader: FC<Props> = (props): JSX.Element => {
  const t = useTranslations("cart");

  return (
    <thead>
      <tr className="border-b">
        <th className="min-w-[100px] text-primary text-center font-bold text-sm pb-3">
          {t("image")}
        </th>

        <th className="px-4 min-w-[300px] text-primary text-center font-bold text-sm flex items-center pb-3">
          {t("details")}
        </th>

        <th className="min-w-[130px] text-primary ml-5 font-bold text-sm pb-3">
          {t("quantity")}
        </th>

        <th className="min-w-[115px] -ml-3 text-primary font-bold text-sm pb-3">
          {t("total_price")}
        </th>

        <th className="min-w-[120px] text-primary font-bold text-sm pb-3">
          {t("actions")}
        </th>
      </tr>
    </thead>
  );
};

export default CartTableHeader;
