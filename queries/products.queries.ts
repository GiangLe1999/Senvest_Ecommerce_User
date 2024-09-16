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

export async function getProductById({
  _id,
  variant_id,
}: {
  _id: string;
  variant_id: string;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/get-by-id/${_id}?variant_id=${variant_id}`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch product by id");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch product by id");
  }
}

export const getNewArrivalsProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/new-arrivals`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch new arrivals products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch new arrivals products");
  }
};

export const getBestSellingProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/best-selling`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch best-selling products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch best-selling products");
  }
};

export const getSaleProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/sale-products`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch sale products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch sale products");
  }
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/all-products`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch sale products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch sale products");
  }
};

export const getRelatedProducts = async ({
  _id,
  category_id,
}: {
  _id: string;
  category_id: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/related-products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, category_id }),
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch related products");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch related products");
  }
};

export const getSearchProducts = async (keyword: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/search/${keyword}`,
      {
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch search product results");
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch search product results");
  }
};
