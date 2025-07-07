// lib/strapiApi.ts
export async function fetchFromStrapi(endpoint: string, options: RequestInit = {}) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!STRAPI_URL) {
    throw new Error('Strapi URL is not defined in environment variables');
  }

  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  // ✅ Make sure this is returned
  return await res.json();
}
