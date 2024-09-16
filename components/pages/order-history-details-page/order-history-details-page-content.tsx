"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SmallSectionContainer from "@/components/small-section-container";
import { Payment } from "@/entities/payment.entity";
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import OrderRow from "./order-row";
import OrderStatusTag from "../order-history-page/order-status-tag";
import { formatCurrencyVND, formatDate } from "@/lib/utils";
import { FileDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Props {
  payment: Payment;
}

const OrderHistoryDetailsPageContent: FC<Props> = ({
  payment,
}): JSX.Element => {
  const t = useTranslations("order_history_details_page");
  const locale = useLocale();
  const { data: session } = useSession();

  const customerInfo = payment.user_address;

  console.log(payment.items[0]);

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
        <div className="flex items-center gap-1 justify-between">
          <h1 className="text-2xl font-bold capitalize mb-3">
            {t("order_no")} #{payment.orderCode}
          </h1>

          <Button className="text-base">
            <FileDownIcon className="w-[18px] h-[18px] mr-1" />
            Export
          </Button>
        </div>

        <div className="mb-6">
          <OrderStatusTag status={payment.status} />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs">
            <span className="font-bold">{t("created_at")}</span>:{" "}
            <span className="text-muted">
              {formatDate(payment.createdAt, locale)}
            </span>
          </div>
          <div className="h-4 border-r"></div>
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

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white border shadow-md rounded-sm p-6 pt-4">
          <h2 className="font-bold uppercase mb-6">{t("customer_order")}</h2>

          <ul className="space-y-2.5">
            <li className="flex items-center gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("name")}</div>:
              <span>{customerInfo?.name}</span>
            </li>

            <li className="flex items-center gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">Email</div>:
              <span>{session ? session.user.email : customerInfo?.email}</span>
            </li>

            <li className="flex items-center gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("phone")}</div>:
              <span>{customerInfo?.phone}</span>
            </li>

            <li className="flex items-center gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("payment_terms")}</div>:
              <span>{t("immediate_payment")}</span>
            </li>

            <li className="flex items-center gap-4 text-sm text-muted">
              <div className="w-[40%] font-bold">{t("order_code")}</div>:
              <span>#{payment.orderCode}</span>
            </li>

            {payment?.coupon_code && (
              <li className="flex items-center gap-4 text-sm text-muted">
                <div className="w-[40%] font-bold">{t("coupon_code")}</div>:
                <span>{payment.coupon_code}</span>
              </li>
            )}

            <li className="flex items-center gap-4 text-sm text-muted">
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
                <th className="min-w-[200px] max-w-[250px] text-xs uppercase text-left pl-6 font-bold py-3">
                  {t("items_details")}
                </th>

                <th className="min-w-[100px] text-xs uppercase text-center font-bold py-3">
                  {t("scent")}
                </th>

                <th className="min-w-[100px] text-xs uppercase text-center font-bold py-3">
                  {t("quantity")}
                </th>

                <th className="min-w-[100px] text-xs uppercase text-right font-bold py-3">
                  {t("price")}
                </th>

                <th className="min-w-[100px] text-xs uppercase text-right pr-6 font-bold py-3">
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
                  {formatCurrencyVND(payment.amount)}
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