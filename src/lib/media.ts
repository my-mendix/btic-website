// src/lib/media.ts
import { StrapiMedia } from '@/types/strapiResponseDataTypes';
import { getStrapiURL } from './config';

/**
 * Resolves the full URL for a Strapi media object.
 * 
 * This function checks if the media URL is already absolute. If not, it prepends
 * the Strapi API URL to construct the full path.
 * 
 * @param media - The Strapi media object.
 * @returns The full URL of the media, or null if the media is invalid.
 */
export const getStrapiMedia = (media: StrapiMedia | null | undefined): string | null => {
  console.log('-----------------------------------------------------');
  console.log('Executing getStrapiMedia function');
  console.log('Media object:', JSON.stringify(media, null, 2));
  console.log('media url: ', media?.url );
  console.log('-----------------------------------------------------');
  if (!media?.url) return null;

  // If the URL is already absolute, return it directly.
  // Otherwise, prepend the Strapi API URL.
  return media.url.startsWith('http')
    ? media.url
    : `${getStrapiURL()}${media.url}`;
};
