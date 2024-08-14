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
}) => {
  try {
    const res = await axiosInstance.post("payments/create", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};
