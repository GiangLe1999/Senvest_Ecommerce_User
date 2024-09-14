"use server";

import { publicAxiosInstance } from "@/configs/axios";
import { AxiosError } from "axios";

export const createSubscriber = async (email: string) => {
  try {
    const res = await publicAxiosInstance.post("subscribers", { email });
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to create subscriber");
  }
};
