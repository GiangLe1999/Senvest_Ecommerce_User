"use server";

import axiosInstance from "@/configs/axios";
import { AxiosError } from "axios";

// Payments
export const getUserPayments = async () => {
  try {
    const res = await axiosInstance("user-payments");
    return res.data;
  } catch (error: AxiosError<any> | any) {
    console.log("Failed to fetch user payments");
  }
};

export const getUserPaymentByOrderCode = async (orderCode: string) => {
  try {
    const res = await axiosInstance(`user-payments/${orderCode}`);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    console.log("Failed to fetch user payment by order code");
  }
};
