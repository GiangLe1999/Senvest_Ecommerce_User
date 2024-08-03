import { Category } from "@/entities/category.entity";

// Slogans
export const getCategoriesForNavigation = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/for-navigation`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as { ok: boolean; categories?: Category[] };
};
