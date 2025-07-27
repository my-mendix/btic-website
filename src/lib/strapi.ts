// src/lib/strapi.ts
import { StrapiResponse, Product } from '@/types/strapi';
import { notFound } from 'next/navigation';
import qs from 'qs';
import { getStrapiURL } from './config';

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
        ProductHeroSection: { populate: ["image"] },
        seo: { populate: "*" },
        faqs: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true, // Ensures clean encoding
    }
  );

  const fullUrl = `${getStrapiURL()}api/products?${query}`;
  console.log(`Fetching product with slug "${slug}" from URL: ${fullUrl}`);
  
  try {
    const res = await fetch(fullUrl, { next: { revalidate: 60 } });

    console.log("Response:", res);
    

    if (!res.ok) {
      // More specific error handling
      if (res.status === 404) {
        console.warn(`Product with slug "${slug}" not found.`);
        notFound();
      } else {
        const errorText = await res.text();
        console.error(`Failed to fetch product with slug "${slug}". URL: ${fullUrl}. Status: ${res.status}. Response: ${errorText}`);
        throw new Error('Failed to fetch product data.');
      }
    }

    const json: StrapiResponse = await res.json();

    if (!json.data || json.data.length === 0) {
      console.warn(`No product data found for slug "${slug}"`);
      notFound();
    }

    return json.data[0];
  } catch (error) {
    console.error("Strapi fetch error:", error);
    // Let Next.js handle the error page
    throw new Error('An unexpected error occurred while fetching the product.');
  }
}

/**
 * Fetches all products from the Strapi API.
 * 
 * @returns A promise that resolves to an array of products.
 */
export async function fetchAllProducts(): Promise<Product[]> {
  const query = qs.stringify(
    {
      fields: ['title', 'slug', 'category', 'price', 'shortDescription'],
      populate: {
        content: {
          on: {
            "product.hero-section": { populate: ["image"] },
          },
        },
        category: {
          fields: ['name']
        }
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const fullUrl = `${getStrapiURL()}api/products?${query}`;
  console.log(`Fetching all products from URL: ${fullUrl}`);
  
  try {
    const res = await fetch(fullUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch all products. URL: ${fullUrl}. Status: ${res.status}. Response: ${errorText}`);
      throw new Error('Failed to fetch products data.');
    }

    const json: StrapiResponse = await res.json();

    if (!json.data) {
      console.warn(`No products data found.`);
      return [];
    }

    return json.data;
  } catch (error) {
    console.error("Strapi fetch error:", error);
    throw new Error('An unexpected error occurred while fetching products.');
  }
}
