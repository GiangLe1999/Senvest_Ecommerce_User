"use server";

// Payments
export const getPayment = async ({ orderCode }: { orderCode: string }) => {
  const res = await fetch(`${process.env.API_BASE_URL}/payments/${orderCode}`, {
    next: { revalidate: 20 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
};
