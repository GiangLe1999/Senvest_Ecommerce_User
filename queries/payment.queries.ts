"use server";

// Payments
export const getPayment = async ({ orderCode }: { orderCode: string }) => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/payments/${orderCode}`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch payment");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch payment");
  }
};
