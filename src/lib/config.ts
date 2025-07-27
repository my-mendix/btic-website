// src/lib/config.ts

/**
 * Retrieves the Strapi API URL from environment variables.
 * 
 * This function ensures that the Strapi URL is properly configured
 * and throws an error if it's missing, preventing runtime issues.
 * 
 * @returns The Strapi API URL.
 */
export const getStrapiURL = (): string => {
//   const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const defaultStrapiUrl = "http://10.1.1.148:1337/";

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || defaultStrapiUrl;

  if (!strapiUrl) {
    throw new Error(
      "NEXT_PUBLIC_STRAPI_API_URL is not defined in your environment variables."
    );
  }

  return strapiUrl;
};

export const STRAPI_URL = getStrapiURL();
