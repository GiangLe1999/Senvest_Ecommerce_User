import { useLocale } from "next-intl";
import { FC, useState } from "react";
import { formatCurrencyVND, getPriceForVariant } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "@/configs/i18n-navigation";

import { getProductById } from "@/queries/products.queries";
import { toast } from "sonner";
import Image from "next/image";
import parse from "html-react-parser";

interface Props {
  item: any;
  t: any;
}

const OrderRow: FC<Props> = ({ item, t }): JSX.Element => {
  const locale = useLocale();
  const isVi = locale === "vi";

  return (
    <tr className="text-sm border-b">
      <td className="min-w-[300px] max-w-[300px] py-4 pl-6">
        <div className="flex items-center gap-5">
          <div className="relative w-[80px] h-[80px] border rounded-sm shrink-0">
            <Image
              src={item.variant_id.images[0]}
              alt={isVi ? item._id.name.vi : item._id.name.en}
              fill
              className="object-cover rounded-sm"
              sizes="100vw"
            />
          </div>

          <div>
            <h3 className="font-bold mb-1">
              {isVi ? item._id.name.vi : item._id.name.en}
            </h3>
            <span className="line-clamp-3 text-xs text-muted">
              {parse(isVi ? item._id.description.vi : item._id.description.en)}
            </span>
          </div>
        </div>
      </td>

      <td className="min-w-[100px] text-center py-4">
        {item.variant_id.fragrance}
      </td>

      <td className="min-w-[100px] text-center py-4">{item.quantity}</td>

      <td className="min-w-[150px] text-right">
        {formatCurrencyVND(item.price)}
      </td>

      <td className="min-w-[150px] text-right py-4 pr-6 font-bold">
        {formatCurrencyVND(item.price * item.quantity)}
      </td>
    </tr>
  );
};

export default OrderRow;
