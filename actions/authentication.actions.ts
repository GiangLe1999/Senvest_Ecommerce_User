"use server";

import { publicAxiosInstance } from "@/configs/axios";
import { AxiosError } from "axios";

export const registerNewAccount = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await publicAxiosInstance.post("users/register", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to register new account");
  }
};

export const verifyAccount = async (data: { otp: string; email: string }) => {
  try {
    const res = await publicAxiosInstance.post("users/verify", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to verify account");
  }
};

export const resendOtp = async (data: { email: string }) => {
  try {
    const res = await publicAxiosInstance.post("users/resend-otp", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to resend otp");
  }
};

export const forgotPassword = async (data: {
  email: string;
  locale: string;
}) => {
  try {
    const res = await publicAxiosInstance.post("users/forgot-password", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to process forgot password");
  }
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  try {
    const res = await publicAxiosInstance.put("users/reset-password", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to process reset password");
  }
};
