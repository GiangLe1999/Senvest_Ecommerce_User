import { Category } from "@/entities/category.entity";

export const getCategoriesForNavigation = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/for-navigation`
    );

    if (!res.ok) {
      console.log("Failed to fetch categories for navigation");
    }

    return (await res.json()) as { ok: boolean; categories?: Category[] };
  } catch (error) {
    console.log("Failed to fetch categories for navigation");
  }
};

export const getCategoryProducts = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${slug}`
    );

    if (!res.ok) {
      console.log("Failed to fetch category products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch category products");
  }
};
