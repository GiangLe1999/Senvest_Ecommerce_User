"use server";

// Slogans
export const getSlogans = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slogans`, {
      next: { revalidate: 20 },
    });

    if (!res.ok) {
      console.log("Failed to fetch slogans");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch slogans");
  }
};
