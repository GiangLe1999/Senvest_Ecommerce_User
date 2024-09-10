"use server";

import axiosInstance from "@/configs/axios";
import { AxiosError } from "axios";

export const createDonationLink = async (data: {
  amount: number;
  description: string;
  cancelUrl: string;
  returnUrl: string;
  email: string;
  name: string;
  phone?: string;
}) => {
  try {
    const res = await axiosInstance.post("donations/create", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    console.log(error);
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to create donation link");
  }
};

export const cancelDonationLink = async ({
  orderCode,
}: {
  orderCode: string;
}) => {
  try {
    const res = await axiosInstance.put("donations/cancel", { orderCode });
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else console.log("Failed to cancel payment link");
  }
};
