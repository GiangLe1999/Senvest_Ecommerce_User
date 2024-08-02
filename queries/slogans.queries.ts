"use server";

import { publicAxiosInstance } from "@/configs/axios";

export const getSlogans = async () => {
  const data = await publicAxiosInstance.get("/slogans");

  return data;
};
