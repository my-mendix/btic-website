"use client";

import React, { useState, useMemo } from 'react';
import styles from './ProductListPage.module.css';
import { ProductTile } from '@/types/strapiResponseDataTypes';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface Props {
  products: ProductTile[];
  slug : string;
}

const ProductListPage: React.FC<Props> = ({ products , slug}) => {
  const [activeGroup, setActiveGroup] = useState("All Products");

  // Get a unique list of categories from the products
  const groups = useMemo(() => {
    const uniquegroups = new Set(products.map(p => p.group));
    return Array.from(uniquegroups);
  }, [products]);
 
  // Filter the products based on the active category
  const filteredProducts = useMemo(() => {
    if (activeGroup === "All Products") {
      return products;
    }
    return products.filter(p => p.group === activeGroup);
  }, [products, activeGroup]);

  return (
    <div className={styles.pageContainer}>
      
{slug === "individual" ? (
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Individual Products</h1>
          <p className={styles.pageDescription}>
            You will be able to plan and to live your life in greater confidence if you have a reliable insurance coverage. At Boubyan Takaful, we are committed to provide you and your family with comprehensive and cost-effective insurance solutions that are perfectly tailored to your personal needs.
          </p>
        </header>
      ) : slug === "corporate" ? (
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Corporate Products</h1>
          <p className={styles.pageDescription}>
            As a leading insurance provider with vast experience in serving a wide range of distinctive corporates, Boubyan Takaful is here to help you build and secure your company by offering customized insurance solutions to cater your needs and your budget.
          </p>
        </header>
      ) : null}


      <ProductFilters
        categories={groups}
        activeCategory={activeGroup}
        onFilterChange={setActiveGroup}
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