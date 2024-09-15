"use server";

import axiosInstance from "@/configs/axios";
import { NotUserInfo } from "@/entities/not-user-info-entity";
import { AxiosError } from "axios";

export const createPaymentLink = async (data: {
  locale: string;
  amount: number;
  description: string;
  cancelUrl: string;
  returnUrl: string;
  user_address?: string;
  not_user_info?: NotUserInfo;
  items: { _id: string; quantity: number; variant_id: string }[];
  coupon_code?: string;
}) => {
  try {
    const res = await axiosInstance.post("payments/create", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to create payment link");
  }
};

export const cancelPaymentLink = async ({
  orderCode,
}: {
  orderCode: string;
}) => {
  try {
    const res = await axiosInstance.put("payments/cancel", { orderCode });
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else console.log("Failed to cancel payment link");
  }
};
