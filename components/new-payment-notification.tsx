"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Image from "next/image";
import { XIcon } from "lucide-react";

interface PaymentData {
  name: string;
  phone: string;
  address: string;
  city: string;
  image: string;
  total: string;
}

export default function NewPaymentNotification() {
  const [data, setData] = useState<PaymentData | null>(null);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    // Subscribe to the channel and event
    const channel = pusher.subscribe("payment");
    channel.bind("new-payment", function (data: PaymentData) {
      setData(data);

      // Set a timeout to clear the notification after 4 seconds
      setTimeout(() => {
        setData(null);
      }, 4000);
    });

    // Cleanup on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="rounded-sm border shadow-md fixed bottom-4 right-4 bg-white">
      <p className="font-bold bg-primary text-white py-2 px-4 rounded-t-sm flex items-center justify-between">
        New Order by {data.name}
        <XIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setData(null)}
        />
      </p>

      <div className="p-4 flex items-center gap-5">
        <Image
          className="border rounded-sm"
          src={data.image}
          alt="Product image"
          width={100}
          height={100}
        />
        <div className="text-sm">
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>Address:</strong> {data.address}, {data.city}
          </p>
          <p>
            <strong>Total price:</strong> {data.total}
          </p>
        </div>
      </div>
    </div>
  );
}
