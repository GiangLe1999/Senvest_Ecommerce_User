"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { replaceFirstFiveCharacters } from "@/lib/utils";

interface DonationData {
  name: string;
  email: string;
  phone?: string;
  comment?: string;
  amount: string;
}

export default function NewDonationNotification() {
  const [data, setData] = useState<DonationData | null>(null);
  const t = useTranslations("new_donation_notification");

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    const channel = pusher.subscribe("donation");
    channel.bind("new-donation", function (data: DonationData) {
      setData(data);

      setTimeout(() => {
        setData(null);
      }, 8000);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="rounded-sm border shadow-md fixed bottom-4 right-4 bg-white max-w-[300px]">
      <p className="font-bold bg-primary text-white py-2 px-4 rounded-t-sm flex items-center justify-between">
        {t("new_order_by")} {data.name}
        <XIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setData(null)}
        />
      </p>

      <div className="p-4">
        <div className="text-sm">
          {data?.phone && (
            <p>
              <strong>{t("phone")}: </strong>
              {replaceFirstFiveCharacters(data.phone)}
            </p>
          )}

          {data?.comment && (
            <p>
              <strong>{t("comment")}: </strong>
              {replaceFirstFiveCharacters(data.comment)}
            </p>
          )}

          <p>
            <strong>{t("amount")}:</strong> {data.amount}
          </p>
        </div>
      </div>
    </div>
  );
}
