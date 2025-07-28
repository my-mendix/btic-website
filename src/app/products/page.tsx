// src/app/individual-products/page.tsx

import { fetchAllProductTiles } from '@/lib/strapi'; // <-- Use the new function
import ProductListPage from '@/components/product-list/ProductListPage';

// This is a Server Component
export default async function IndividualProducts() {
  // 1. Fetch data on the server using the correct function
  const products = await fetchAllProductTiles();
  console.log(products);




  // 2. Pass the correctly typed data as props to the interactive Client Component
  return <ProductListPage products={products} />;
}