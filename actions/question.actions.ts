"use server";

import { publicAxiosInstance } from "@/configs/axios";
import { AxiosError } from "axios";

export const createQuestion = async (data: {
  name: string;
  email: string;
  phone?: string;
  question: string;
  product: string;
}) => {
  try {
    const res = await publicAxiosInstance.post("questions", data);
    return res.data;
  } catch (error: AxiosError<any> | any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else throw new Error("Failed to create question");
  }
};
