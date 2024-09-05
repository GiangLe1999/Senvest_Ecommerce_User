"use server";

import { publicAxiosInstance } from "@/configs/axios";
import { AxiosError } from "axios";

export const createContact = async (data: {
  name: string;
  subject: string;
  email: string;
  phone?: string;
  payment_id?: string;
  message: string;
}) => {
  try {
    const res = await publicAxiosInstance.post("contacts", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to create review");
  }
};
