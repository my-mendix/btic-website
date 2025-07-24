import { StrapiResponse, Product } from "@/types/product";

const STRAPI_URL =
  process.env.STRAPI_API_URL || "http://10.1.1.148:1337/api";

export async function fetchAllProducts(): Promise<StrapiResponse<Product>> {
  const res = await fetch(`${STRAPI_URL}/products?populate=*`);
  const json = await res.json();
  return json as StrapiResponse<Product>;
}
