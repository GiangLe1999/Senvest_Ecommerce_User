"use server";

export const getThreeLatestArticles = async () => {
  try {
    const res = await fetch(`${process.env.BLOG_JSON_BASE_URL}?per_page=3`);

    if (!res.ok) {
      console.log("Failed to fetch blogs");
      return;
    }

    const articles = await res.json();

    // Use Promise.all to fetch thumbnails concurrently
    const articlesWithThumbnails = await Promise.all(
      articles.map(async (article: any) => {
        // Fetch the featured media for each article
        if (article._links["wp:featuredmedia"]) {
          const mediaRes = await fetch(
            article._links["wp:featuredmedia"][0].href
          );
          if (mediaRes.ok) {
            const media = await mediaRes.json();
            article.thumbnail = media.media_details.sizes.medium.source_url;
          } else {
            article.thumbnail = null;
          }
        } else {
          article.thumbnail = null;
        }

        return article;
      })
    );

    return articlesWithThumbnails;
  } catch (error) {
    console.log("Failed to fetch blogs");
  }
};
