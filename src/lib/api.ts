// src/lib/api.ts

import { Product } from "@/types/product";

const API_URL = "http://10.1.1.148:1337/api/products?populate=*";

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data as Product[];
}
