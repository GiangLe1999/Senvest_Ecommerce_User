"use server";

// Donations
export const getDonation = async ({ orderCode }: { orderCode: string }) => {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/donations/${orderCode}`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch donation");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch donation");
  }
};
