import { StatusEnum } from "@/entities/payment.entity";
import { cn } from "@/lib/utils";
import { CircleAlertIcon, CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  status: StatusEnum;
}

const statusStyles: Record<StatusEnum, string> = {
  [StatusEnum.pending]: "bg-[#ffebd0] text-[#df8910]",
  [StatusEnum.cancelled]: "bg-[#fce5e5] text-red-500",
  [StatusEnum.paid]: "bg-[#e1fbed] text-[#0da552]",
};

const icons: Record<StatusEnum, any> = {
  [StatusEnum.paid]: <CircleCheckBigIcon className="w-4 h-4" />,
  [StatusEnum.cancelled]: <CircleXIcon className="w-4 h-4" />,
  [StatusEnum.pending]: <CircleAlertIcon className="w-4 h-4" />,
};

const OrderStatusTag: FC<Props> = ({ status }): JSX.Element => {
  const t = useTranslations("order_history_page");
  return (
    <div
      className={cn(
        "py-1.5 px-2 rounded-sm shadow w-fit font-bold flex items-center gap-1 sm:text-base text-xs",
        statusStyles[status]
      )}
    >
      {icons[status]}
      {t(status)}
    </div>
  );
};

export default OrderStatusTag;
