"use server";

import { publicAxiosInstance } from "@/configs/axios";
import { AxiosError } from "axios";

export const createReview = async (data: {
  product_id: string;
  variant_id: string;
  rating: number;
  comment: string;
  name: string;
  email: string;
}) => {
  try {
    const res = await publicAxiosInstance.post("reviews", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to create review");
  }
};
