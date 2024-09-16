import { useLocale } from "next-intl";
import { FC, useState } from "react";
import {
  cn,
  formatCurrencyVND,
  formatDate,
  getPriceForVariant,
} from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { Link, useRouter } from "@/configs/i18n-navigation";

import { Payment } from "@/entities/payment.entity";
import OrderStatusTag from "./order-status-tag";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, LoaderIcon, Repeat2Icon } from "lucide-react";
import { getProductById } from "@/queries/products.queries";
import { toast } from "sonner";

interface Props {
  payment: Payment;
  t: any;
  isLastRow?: boolean;
}

const OrderRow: FC<Props> = ({ payment, t, isLastRow }): JSX.Element => {
  const locale = useLocale();
  const { addToCart } = useCartStore((state) => state);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const reOrderHandler = async (items: any) => {
    try {
      setLoading(true);
      await Promise.all(
        items.map(async (item: any) => {
          const res = await getProductById({
            _id: item._id,
            variant_id: item.variant_id,
          });

          if (res.ok && res.product) {
            const product = res.product;
            addToCart({
              _id: product._id,
              variant_id: product.variants[0]._id,
              quantity: item.quantity,
              price: getPriceForVariant(product.variants[0]),
              image: product.variants[0].images[0],
              name: product.name,
              scent: product.variants[0].fragrance,
              stock: product.variants[0].stock,
              slug: product.slug,
              locale,
            });
          } else {
            return toast.error(t("reorder_failed"), {
              description: res.error,
            });
          }
        })
      );

      setLoading(false);
      toast.success(t("reorder_success"), {
        description: t("reorder_success_desc"),
      });
      return router.push("/thanh-toan");
    } catch (error) {
      toast.error(t("reorder_failed"), {
        description: t("reorder_failed_desc"),
      });
    }
  };

  return (
    <tr className={cn("text-sm border-b", isLastRow && "border-0")}>
      <td className="min-w-[150px] text-center py-4 font-bold">
        #{payment.orderCode}
      </td>

      <td className="min-w-[230px] text-center py-4">
        {formatDate(payment?.updatedAt, locale)}
      </td>

      <td className="min-w-[205px]">
        <p className="line-clamp-1 text-center py-4">
          <span className="font-bold">{formatCurrencyVND(payment.amount)}</span>
        </p>
      </td>

      <td className="min-w-[240px] text-center py-4">
        <div className="flex items-center justify-center">
          <OrderStatusTag status={payment.status} />
        </div>
      </td>

      <td className="min-w-[335px] text-center py-4">
        <div className="flex items-center justify-center gap-2">
          <Button variant="link">
            <Link
              href={`/tai-khoan/lich-su-mua-hang/${payment.orderCode}` as any}
              className="font-bold flex items-center gap-1"
            >
              {t("details")}
              <ExternalLinkIcon className="w-[14px] h-[14px]" />
            </Link>
          </Button>
          <div className="border-r border-[#cccccc] h-4"></div>
          <Button
            variant="link"
            className="font-bold flex items-center gap-1"
            onClick={() => reOrderHandler(payment.items)}
          >
            {t("re_order")}
            {loading ? (
              <LoaderIcon className="w-4 h-4 animate-spin" />
            ) : (
              <Repeat2Icon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
