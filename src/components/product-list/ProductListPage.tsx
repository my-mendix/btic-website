"use client";

import React, { useState, useMemo } from 'react';
import styles from './ProductListPage.module.css';
import { ProductTile } from '@/types/strapi';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface Props {
  products: ProductTile[];
}

const ProductListPage: React.FC<Props> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  // Get a unique list of categories from the products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.Category));
    return Array.from(uniqueCategories);
  }, [products]);

  // Filter the products based on the active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") {
      return products;
    }
    return products.filter(p => p.Category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Individual Products</h1>
        <p className={styles.pageDescription}>
          You will be able to plan and to live your life in greater confidence if you have a reliable insurance coverage. At Boubyan Takaful, we are committed to provide you and your family with comprehensive and cost-effective insurance solutions that are perfectly tailored to your personal needs.
        </p>
      </header>

      <ProductFilters
        categories={categories}
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />

      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;