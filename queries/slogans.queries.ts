"use server";
import { publicAxiosInstance } from "@/configs/axios";

export const getSlogans = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slogans`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
  // const data = await publicAxiosInstance.get("/slogans");

  // return data;
};
