"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import Empty from "@/components/empty";
import SmallSectionContainer from "@/components/small-section-container";
import { Payment } from "@/entities/payment.entity";
import { useTranslations } from "next-intl";
import { FC } from "react";
import OrderRow from "./order-row";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  payments: Payment[];
}

const OrderHistoryDetailPageContent: FC<Props> = ({
  payments,
}): JSX.Element => {
  const t = useTranslations("order_history_page");

  return (
    <SmallSectionContainer className="mt-12">
      <CustomBreadcrumb
        pages={[
          { name: t("account"), link: "/tai-khoan" },
          { name: t("heading"), link: "/tai-khoan/lich-su-mua-hang" },
        ]}
      />

      <h1 className="text-3xl font-bold mt-6 capitalize mb-3 text-primary">
        {t("heading")}
      </h1>

      {payments.length === 0 ? (
        <Empty />
      ) : (
        <>
          <ScrollArea className="w-full h-fit bg-white pb-1 border shadow-md mt-6 rounded-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="min-w-[150px] text-xs uppercase text-center font-bold py-3">
                    {t("code")}
                  </th>

                  <th className="min-w-[230px] text-xs uppercase text-center font-bold py-3">
                    {t("date")}
                  </th>

                  <th className="min-w-[205px] text-xs uppercase text-center font-bold py-3">
                    {t("total_price")}
                  </th>

                  <th className="min-w-[240px] text-xs uppercase text-center font-bold py-3">
                    {t("status")}
                  </th>

                  <th className="min-w-[335px] text-xs uppercase text-center font-bold py-3">
                    {t("invoice")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <OrderRow
                    payment={payment}
                    t={t}
                    key={payment._id}
                    isLastRow={index === payments.length - 1}
                  />
                ))}
              </tbody>
            </table>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </>
      )}
    </SmallSectionContainer>
  );
};

export default OrderHistoryDetailPageContent;
