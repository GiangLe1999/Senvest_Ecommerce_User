"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Payment } from "@/entities/payment.entity";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import OrderRow from "./order-row";
import OrderStatusTag from "../order-history-page/order-status-tag";
import { formatCurrencyVND, formatDate, getPriceForVariant } from "@/lib/utils";
import { FileDownIcon, Loader2Icon, Repeat2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { exportOrderData } from "@/lib/export-order";
import { useCartStore } from "@/stores/useCartStore";
import { getProductById } from "@/queries/products.queries";
import { toast } from "sonner";
import { useRouter } from "@/configs/i18n-navigation";

interface Props {
  payment: Payment;
}

const OrderHistoryDetailsPageContent: FC<Props> = ({
  payment,
}): JSX.Element => {
  const t = useTranslations("order_history_details_page");
  const t2 = useTranslations("order_history_page");
  const locale = useLocale();
  const isVi = locale === "vi";
  const { data: session } = useSession();
  const { addToCart } = useCartStore((state) => state);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const customerInfo = payment.user_address;
  const subtotal = payment.items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const exportHandler = async () => {
    try {
      exportOrderData({
        orderNumber: `#${payment.orderCode}`,
        paymentStatus: t2(payment.status),
        createdDate: formatDate(payment.createdAt, locale),
        paidDate:
          formatDate(payment.transactionDateTime, locale) ||
          formatDate(payment.updatedAt, locale),
        customer: {
          name: customerInfo?.name,
          email: session?.user?.email || "",
          phone: customerInfo?.phone,
          paymentTerms: t("payment_terms"),
          orderCode: `#${payment.orderCode}`,
          couponCode: payment?.coupon_code || "",
          deliveryMethod: "Kindle Hope Candles",
        },
        shippingAddress: `${customerInfo.address}, ${customerInfo.city}, ${
          customerInfo.province
        }, ${customerInfo.zip} ${t("vietnam")}`,
        billingAddress: `${customerInfo.address}, ${customerInfo.city}, ${
          customerInfo.province
        }, ${customerInfo.zip} ${t("vietnam")}`,
        items: payment.items.map((item: any) => ({
          name: isVi ? item._id.name.vi : item._id.name.en,
          scent: item.variant_id.fragrance,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        subtotal,
        discount: payment?.coupon_value || 0,
        shipping: 0,
        taxAmount: 0,
        total: payment.amount,
      });
    } catch (error) {
      console.error("Failed to export user order:", error);
    }
  };

  const reOrderHandler = async () => {
    try {
      setLoading(true);
      await Promise.all(
        payment.items.map(async (item: any) => {
          const res = await getProductById({
            _id: item._id._id,
            variant_id: item.variant_id._id,
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
            return toast.error(t2("reorder_failed"), {
              description: res.error,
            });
          }
        })
      );

      setLoading(false);
      toast.success(t2("reorder_success"), {
        description: t2("reorder_success_desc"),
      });
      return router.push("/thanh-toan");
    } catch (error) {
      toast.error(t2("reorder_failed"), {
        description: t2("reorder_failed_desc"),
      });
    }
  };

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[
          { name: t("account"), link: "/tai-khoan" },
          { name: t("breadcrumb"), link: "/tai-khoan/lich-su-mua-hang" },
          {
            name: `${t("heading")}`,
            link: `/tai-khoan/lich-su-mua-hang/${payment.orderCode}`,
          },
        ]}
      />

      <div className="bg-white border shadow-md mt-6 rounded-sm p-6">
        <div className="flex items-center gap-x-2 gap-y-3 justify-between flex-wrap">
          <h1 className="sm:text-2xl text-xl font-bold capitalize">
            {t("order_no")} #{payment.orderCode}
          </h1>

          <div className="flex items-center gap-3">
            <button
              className="py-2 px-4 rounded-sm sm:text-base text-xs text-primary flex items-center bg-primary text-white"
              onClick={exportHandler}
            >
              <FileDownIcon className="sm:w-[18px] w-4 sm:h-[18px] h-4 mr-1" />
              Export
            </button>

            <button
              type="button"
              onClick={reOrderHandler}
              className="py-2 px-4 border border-primary rounded-sm sm:text-base text-xs text-primary flex items-center"
            >
              {loading ? (
                <Loader2Icon className="sm:w-[18px] w-4 sm:h-[18px] h-4 mr-1 animate-spin" />
              ) : (
                <Repeat2Icon className="sm:w-[18px] w-4 sm:h-[18px] h-4 mr-1" />
              )}
              {t2("re_order")}
            </button>
          </div>
        </div>

        <div className="mb-6 mt-3">
          <OrderStatusTag status={payment.status} />
        </div>

        <div className="flex items-center flex-wrap gap-4">
          <div className="text-xs">
            <span className="font-bold">{t("created_at")}</span>:{" "}
            <span className="text-muted">
              {formatDate(payment.createdAt, locale)}
            </span>
          </div>
          <div className="h-4 sm:border-r"></div>
          {payment.transactionDateTime ? (
            <div className="text-xs">
              <span className="font-bold">{t("paid_on")}</span>:{" "}
              <span className="text-muted">
                {formatDate(payment.transactionDateTime, locale)}
              </span>
            </div>
          ) : (
            <div className="text-xs">
              <span className="font-bold">{t("updated_at")}</span>:{" "}
              <span className="text-muted">
                {formatDate(payment.updatedAt, locale)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
        <div className="bg-white border shadow-md rounded-sm p-6 pt-4">
          <h2 className="font-bold uppercase mb-6">{t("customer_order")}</h2>

          <ul className="space-y-2.5">
            <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("name")}</div>:
              <span>{customerInfo?.name}</span>
            </li>

            <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">Email</div>:
              <span>{session ? session.user.email : customerInfo?.email}</span>
            </li>

            <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("phone")}</div>:
              <span>{customerInfo?.phone}</span>
            </li>

            <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("payment_terms")}</div>:
              <span>{t("immediate_payment")}</span>
            </li>

            <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("order_code")}</div>:
              <span>#{payment.orderCode}</span>
            </li>

            {payment?.coupon_code && (
              <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
                <div className="w-[40%] font-bold">{t("coupon_code")}</div>:
                <span>{payment.coupon_code}</span>
              </li>
            )}

            <li className="flex items-center flex-wrap gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("delivery_method")}</div>:
              <span>Kindle Hope Candles</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border shadow-md rounded-sm p-6 pt-4">
          <h2 className="font-bold uppercase mb-6">{t("shipping_address")}</h2>

          <address className="text-[13px] not-italic text-muted min-h-[144px]">
            {customerInfo.address} <br /> {customerInfo.city},{" "}
            {customerInfo.province} {customerInfo.zip} <br />
            {t("vietnam")}
          </address>
        </div>

        <div className="bg-white border shadow-md rounded-sm p-6 pt-4">
          <h2 className="font-bold uppercase mb-6">{t("billing_address")}</h2>

          <address className="text-[13px] not-italic text-muted min-h-[144px]">
            {customerInfo.address} <br /> {customerInfo.city},{" "}
            {customerInfo.province} {customerInfo.zip} <br />
            {t("vietnam")}
          </address>
        </div>
      </div>

      <>
        <ScrollArea className="w-full h-fit bg-white pt-4 pb-1 border shadow-md mt-6 rounded-sm">
          <h2 className="px-6 font-bold uppercase text-foreground border-b pb-4">
            {t("items_ordered")}
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-muted bg-[#F9FAFB]">
                <th className="min-w-[300px] max-w-[300px] text-xs uppercase text-left pl-6 font-bold py-3">
                  {t("items_details")}
                </th>

                <th className="min-w-[100px] text-xs uppercase text-center font-bold py-3">
                  {t("scent")}
                </th>

                <th className="min-w-[100px] text-xs uppercase text-center font-bold py-3">
                  {t("quantity")}
                </th>

                <th className="min-w-[150px] text-xs uppercase text-right font-bold py-3">
                  {t("price")}
                </th>

                <th className="min-w-[150px] text-xs uppercase text-right pr-6 font-bold py-3">
                  {t("total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {payment.items.map((item: any, index: number) => (
                <OrderRow item={item} t={t} key={item._id} />
              ))}

              <tr className="text-sm border-b">
                <td colSpan={3}></td>
                <td className="text-right py-4 text-xs uppercase text-muted font-bold">
                  {t("subtotal")}
                </td>
                <td className="text-right font-bold pr-6">
                  {formatCurrencyVND(subtotal)}
                </td>
              </tr>

              <tr className="text-sm border-b">
                <td colSpan={3}></td>
                <td className="text-right py-4 text-xs uppercase text-muted font-bold">
                  {t("shipping_handling")}
                </td>
                <td className="text-right font-bold pr-6">
                  {formatCurrencyVND(0)}
                </td>
              </tr>

              <tr className="text-sm border-b">
                <td colSpan={3}></td>
                <td className="text-right py-4 text-xs uppercase text-muted font-bold">
                  {t("tax_amount")}
                </td>
                <td className="text-right font-bold pr-6">
                  {formatCurrencyVND(0)}
                </td>
              </tr>

              <tr className="text-sm border-b">
                <td className="pl-8 py-4">
                  <span className="text-muted">{t("coupon_code")}</span> :{" "}
                  <span className="font-bold">
                    {payment?.coupon_code ? payment?.coupon_code : ""}
                  </span>
                </td>
                <td colSpan={2}></td>
                <td className="text-right py-4 text-xs uppercase text-muted font-bold">
                  {t("discount")}
                </td>
                <td className="text-right font-bold pr-6">
                  - {formatCurrencyVND(payment?.coupon_value || 0)}
                </td>
              </tr>

              <tr className="text-sm">
                <td className="pl-8 py-4">
                  <span className="text-muted">{t("currency")}</span> :{" "}
                  <span className="font-bold">VND</span>
                </td>
                <td colSpan={2}></td>
                <td className="text-right py-4 text-xs uppercase text-muted font-bold">
                  {t("total")}
                </td>
                <td className="text-right font-bold pr-6">
                  {formatCurrencyVND(payment.amount)}
                </td>
              </tr>
            </tbody>
          </table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </>
    </SmallSectionContainer>
  );
};

export default OrderHistoryDetailsPageContent;
