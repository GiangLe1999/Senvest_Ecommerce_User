"use server";

import axiosInstance from "@/configs/axios";
import { GenderEnum } from "@/entities/user.entity";
import { AxiosError } from "axios";

export const getUserProfile = async () => {
  try {
    const res = await axiosInstance("profile");
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};

export const updateUserProfile = async (data: {
  name?: string;
  current_password?: string;
  new_password?: string;
  date_of_birth?: string;
  gender?: GenderEnum;
  receive_offers?: boolean;
}) => {
  try {
    console.log(data);
    const res = await axiosInstance.put("profile", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    return error.response.data;
  }
};
