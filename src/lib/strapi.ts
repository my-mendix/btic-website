// src/lib/strapi.ts
import { StrapiResponse,
         Product,
         ProductTile,
         StrapiProductTileResponse,
         ProductMenuDataApiResponse,
         ProductCategory,
         ProductLink,
         MainMenuColumn } from '@/types/strapiResponseDataTypes';
import { notFound } from 'next/navigation';
import qs from 'qs';
import { getStrapiURL } from './config';



export async function fetchMainMenuData(): Promise<MainMenuColumn[]> {
  console.log('-----------------------------------------------------');
  console.log('executing fetchMainMenuData function');
  console.log('-----------------------------------------------------');
  const query = "/api/categories?fields[0]=title&fields[1]=category&populate[0]=links";
  const fullUrl = `${getStrapiURL()}${query}`;
  // console.log(`Fetching mega menu data from URL: ${fullUrl}`);

  try {
    const res = await fetch(fullUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch mega menu data. URL: ${fullUrl}. Status: ${res.status}. Response: ${errorText}`);
      return [];
    }

    const json: ProductMenuDataApiResponse = await res.json();
    if (!json.data) {
      console.warn(`No mega menu data found.`);
      return [];
    }

    
return json.data.map((item: ProductCategory) => ({
      title: item.title || '',
      titleAr: item.titleAr || '',
      category: item.category || '',
      links: (item.links || []).map((link: ProductLink) => ({
        name: link.name || '',
        nameAr: link.nameAr || '',
        href: link.href || '#',
        hrefAr: link.hrefAr || '#',
      })),
    }));

  } catch (error) {
    console.error("Strapi fetch error (mega menu):", error);
    return [];
  }
}


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
  console.log('-----------------------------------------------------');
  console.log('executing fetchProductBySlug function');
  console.log('-----------------------------------------------------');
  const query = qs.stringify(
    {
      filters: {
        slug: {
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
        hero: {
          populate: {
            image: {
              fields: ["url", "alternativeText"]
            },
            buttons: {
              fields: ["label", "url", "label_ar", "url_ar"]
            }
          }
        },
        claim: {
          populate: {
            image: {
              fields: ["url", "alternativeText"]
            },
            buttons: {
              fields: ["label", "url", "label_ar", "url_ar"]
            }
          }
        },
        seo: { populate: "*" },
        faqs: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true, // Ensures clean encoding
    }
  );

  const fullUrl = `${getStrapiURL()}/api/products?${query}`;
  console.log(`Fetching product with slug "${slug}" from URL: ${fullUrl}`);
  
  try {
    const res = await fetch(fullUrl, { next: { revalidate: 60 } });
    

    if (!res.ok) {
      // More specific error handling
      if (res.status === 404) {
        console.warn(`Product with slug "${slug}" not found.`);
        notFound();
      } else {
        const errorText = await res.text();
        console.error(`Failed to fetch product with slug "${slug}". URL: ${fullUrl.toString()}. Status: ${res.status}. Response: ${errorText}`);
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
  console.log('-----------------------------------------------------');
  console.log('Executeing fetchAllProducts function');
  console.log('-----------------------------------------------------');
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
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  
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


/**
 * Fetches all product tiles from the /api/product-tiles endpoint.
 * This is specifically for the product listing page.
 * 
 * @returns A promise that resolves to an array of product tiles.
 */

export async function fetchAllProductTiles(): Promise<ProductTile[]> {
  console.log('-----------------------------------------------------');
  console.log('Executing fetchAllProductTiles function');
  console.log('-----------------------------------------------------');
  // This query exactly matches the one you provided
  // const query = "/api/product-tiles?fields[0]=Title&fields[1]=shortDescription&fields[2]=Price&fields[3]=group&fields[4]=category&populate[image][fields][0]=url&populate[image][fields][1]=name&populate[Buttons][fields][0]=label&populate[Buttons][fields][1]=url";
  const query = "/api/products?fields[0]=title&fields[1]=shortDescription&fields[2]=minimumPrice&fields[3]=group&fields[4]=category&populate[cardImage][fields][0]=url&populate[cardImage][fields][1]=name&populate[cardButtons][fields][0]=label&populate[cardButtons][fields][1]=url";
  
  const fullUrl = `${getStrapiURL()}${query}`;
  console.log(`Fetching all product tiles from URL: ${fullUrl}`);
  
  try {
    const res = await fetch(fullUrl, { next: { revalidate: 60 } });
    

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch all product tiles. URL: ${fullUrl}. Status: ${res.status}. Response: ${errorText}`);
      throw new Error('Failed to fetch product tiles data.');
    }

    const json: StrapiProductTileResponse = await res.json();
    // console.log(`Received product tiles data:`, json.data);

    if (!json.data) {
      console.warn(`No product tiles data found.`);
      return [];
    }

    // The response is already in the correct format, so just return the data array
    return json.data;
  } catch (error) {
    console.error("Strapi fetch error:", error);
    // Return empty array to prevent the page from crashing
    return [];
  }
}
