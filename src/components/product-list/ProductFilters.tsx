// src/components/product-list/ProductFilters.tsx
import React from 'react';
import styles from './ProductListPage.module.css';

interface Props {
  categories: string[];
  activeCategory: string;
  onFilterChange: (category: string) => void;
}

const ProductFilters: React.FC<Props> = ({ categories, activeCategory, onFilterChange }) => {
  // Define a specific order for categories
  const categoryOrder = ["All Products", "Motor", "Property & Casualty", "Travel", "Life & Medical"];
  const sortedCategories = categoryOrder.filter(cat => cat === "All Products" || categories.includes(cat));

  return (
    <nav className={styles.filterNav}>
      {sortedCategories.map(category => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={activeCategory === category ? styles.activeFilter : styles.filterButton}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default ProductFilters;