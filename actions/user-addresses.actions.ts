"use server";

import axiosInstance from "@/configs/axios";
import { AxiosError } from "axios";

export const createUserAddress = async (data: {
  alias?: string;
  name: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  phone: string;
}) => {
  try {
    const res = await axiosInstance.post("user-addresses/create", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};

export const updateUserAddress = async (data: {
  _id: string;
  alias?: string;
  name?: string;
  address?: string;
  city?: string;
  province?: string;
  zip?: string;
  phone?: string;
}) => {
  try {
    const res = await axiosInstance.put("user-addresses/update", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};

export const deleteUserAddress = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`user-addresses/${id}`);

    return res.data;
  } catch (error: AxiosError<any> | any) {
    throw new Error("Failed to delete user address");
  }
};
