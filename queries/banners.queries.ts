"use server";

// Banners
export const getBanners = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banners`, {
      next: { revalidate: 20 },
    });

    if (!res.ok) {
      console.log("Failed to fetch banners");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch banners");
  }
};
