"use server";

// Banners
export const getCoupon = async (code: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupons/${code}`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch coupon");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch coupon");
  }
};
