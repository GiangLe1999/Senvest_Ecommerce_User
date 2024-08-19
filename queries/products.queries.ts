"use server";

// Products
export const getHomepageProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/homepage`,
    {
      next: { revalidate: 20 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
};

export async function getProductSlugsMappings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/slug-mapping`,
    {
      next: { revalidate: 20 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
    {
      next: { revalidate: 20 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
