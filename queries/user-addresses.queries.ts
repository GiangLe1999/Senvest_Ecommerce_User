"use server";

import axiosInstance from "@/configs/axios";
import { AxiosError } from "axios";

// User Addresses
export const getUserAddresses = async () => {
  try {
    const res = await axiosInstance("user-addresses");
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};
