"use server";

// Banners
export const getBanners = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banners`, {
    next: { revalidate: 20 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
};
