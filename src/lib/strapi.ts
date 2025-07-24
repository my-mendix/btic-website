// src/lib/strapi.ts
import { StrapiResponse, Product } from '@/types/strapi';
import { notFound } from 'next/navigation';
import qs from 'qs';

// Use a more secure and flexible approach for the Strapi URL.
// Fallback to a local development URL instead of a hardcoded IP.
const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetches a single product by its slug from the Strapi API.
 * 
 * This function uses the `qs` library to build a clean and readable query string
 * for populating all necessary relations, including dynamic zone components.
 * 
 * @param slug - The slug of the product to fetch.
 * @returns A promise that resolves to the product data.
 */
export async function fetchProductBySlug(slug: string): Promise<Product> {
  const query = qs.stringify(
    {
      filters: {
        Slug: {
          $eq: slug,
        },
      },
      populate: {
        content: {
          on: {
            "product.hero-section": { populate: ["image", "buttons"] },
            "product.claims-section": { populate: "*" },
            "product.coverage-list": { populate: "*" },
            "product.downloads-block": { populate: "*" },
            "product.addons-section": {
              populate: {
                features: {
                  populate: ["icon"],
                },
              },
            },
          },
        },
        seo: { populate: "*" },
        faqs: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true, // Ensures clean encoding
    }
  );

  const fullUrl = `${STRAPI_URL}/api/products?${query}`;
  
  try {
    // Using 'no-store' is fine for development, but for production,
    // consider using Next.js's Incremental Static Regeneration (ISR)
    // by setting `next: { revalidate: 60 }}` for better performance.
    const res = await fetch(fullUrl, { cache: 'no-store' });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch product with slug "${slug}". URL: ${fullUrl}. Response: ${errorText}`);
      throw new Error('Failed to fetch product');
    }

    const json: StrapiResponse = await res.json();

    if (!json.data || json.data.length === 0) {
      console.warn(`No product found for slug "${slug}"`);
      notFound();
    }

    return json.data[0];
  } catch (error) {
    console.error("Strapi fetch error:", error);
    // Re-throwing the error or handling it in a more specific way
    // might be better than just calling notFound() for all errors.
    notFound();
  }
}
