"use server";

// Coupon
export const getCoupon = async (code: string, email?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupons/${code}${
        email ? `?email=${email}` : ""
      }`,
      {
        next: { revalidate: 10 },
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
    console.log("Failed to fetch coupon");
  }
};
