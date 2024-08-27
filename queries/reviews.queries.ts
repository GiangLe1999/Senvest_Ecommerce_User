export async function getProductReviews(data: {
  product_id: string;
  page: number;
  limit: number;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${data.product_id}?page=${data.page}&limit=${data.limit}`
    );

    if (!res.ok) {
      console.log("Failed to fetch product reviews");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch product reviews");
  }
}
