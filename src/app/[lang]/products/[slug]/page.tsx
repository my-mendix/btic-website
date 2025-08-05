// src/app/individual-products/page.tsx
import { fetchAllProductTiles } from '@/lib/strapi'; 
import ProductListPage from '@/components/product-list/ProductListPage';
import { ProductTile } from '@/types/strapiResponseDataTypes';



// This is a Server Component
async function ProductsPage({
  params 
}: { 
  params: Promise<{ slug: string ; lang: string;}>; // Type 'params' as a Promise
}) {
  // Await 'params' to resolve the Promise and get the actual object
  const { slug } = await params; 
  const { lang } = await params; 
  console.log('lang:', lang);

  // 1. Fetch data on the server 
  const products = await fetchAllProductTiles();
  // console.log('Fetched products:', products);

  const filteredProducts = products.filter((item: ProductTile) => item.category.toLowerCase() === slug);
  // console.log('Filtered Products:', filteredProducts);
  console.log('Slug:', slug);
  

  // console.log('Fetched products:', products);
  // 2. Pass the correctly typed data as props to the interactive Client Component
  return (
      <ProductListPage products={filteredProducts} slug={slug} />
    );
}

export default ProductsPage;