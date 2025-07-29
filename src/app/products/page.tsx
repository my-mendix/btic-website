// src/app/individual-products/page.tsx
import { fetchAllProductTiles } from '@/lib/strapi'; 
import ProductListPage from '@/components/product-list/ProductListPage';

// This is a Server Component
export default async function IndividualProducts() {
  // 1. Fetch data on the server 
  const products = await fetchAllProductTiles();
  // console.log('Fetched products:', products);
  // 2. Pass the correctly typed data as props to the interactive Client Component
  return <ProductListPage products={products} />;
}