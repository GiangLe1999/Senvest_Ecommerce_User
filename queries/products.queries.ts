"use server";

// Products
export const getHomepageProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/homepage`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch homepage products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch homepage products");
  }
};

export async function getProductSlugsMappings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/slug-mapping`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch product slugs mappings");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch product slugs mappings");
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch product by slug");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch product by slug");
  }
}
