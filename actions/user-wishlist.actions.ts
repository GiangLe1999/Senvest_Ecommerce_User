"use server";

import axiosInstance from "@/configs/axios";
import { PriorityEnum } from "@/entities/wishlist-item.entity";
import { AxiosError } from "axios";

export const addNewProductToWishlist = async (data: {
  _id: string;
  quantity: number;
  variant_id: string;
}) => {
  try {
    const res = await axiosInstance.put("user-wishlist/add-new", {
      item: data,
    });

    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to add product to wishlist");
  }
};

export const updateWishlistProduct = async (data: {
  product_id: string;
  variant_id: string;
  priority?: PriorityEnum;
  quantity?: number;
}) => {
  try {
    const res = await axiosInstance.put("user-wishlist/update", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    throw new Error("Failed to update product in wishlist");
  }
};

export const deleteWishlistProduct = async (data: {
  product_id: string;
  variant_id: string;
}) => {
  try {
    const res = await axiosInstance.put("user-wishlist/delete", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    throw new Error("Failed to delete product in wishlist");
  }
};
