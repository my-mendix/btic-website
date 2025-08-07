// src/components/product-page/RecommendedProducts.tsx
import React from 'react';
import { ProductTile } from '@/types/strapiResponseDataTypes';
import ProductCard from '@/components/product-list/ProductCard';
import styles from './RecommendedProducts.module.css';

interface RecommendedProductsProps {
  products: ProductTile[];
  currentSlug: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products, currentSlug }) => {
  const recommended = products
    .filter(p => p.slug !== currentSlug)
    .slice(0, 3);

  return (
    <div className={styles.recommendedSection}>
      <h2 className={styles.recommendedTitle}>Also recommended for you</h2>
      <div className={styles.recommendedGrid}>
        {recommended.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
