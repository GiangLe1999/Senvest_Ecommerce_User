"use server";

import axiosInstance from "@/configs/axios";
import { AxiosError } from "axios";

export const getUserProfile = async () => {
  try {
    const res = await axiosInstance("profile");
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};
