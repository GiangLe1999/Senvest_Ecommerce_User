"use server";

import axiosInstance from "@/configs/axios";
import { AxiosError } from "axios";

export const getUserWishlist = async () => {
  try {
    const res = await axiosInstance("user-wishlist");
    return res.data;
  } catch (error: AxiosError<any> | any) {
    console.log("Failed to fetch user wishlist");
  }
};

export const getUserWishlistLength = async () => {
  try {
    const res = await axiosInstance("user-w ishlist/length");
    return res.data;
  } catch (error: AxiosError<any> | any) {
    console.log("Failed to fetch user wishlist");
  }
};
