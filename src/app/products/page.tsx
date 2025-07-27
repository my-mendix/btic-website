'use client';

import React, { useState, useEffect } from 'react';
import { StaticProduct } from '@/types/strapi';
import ProductCard from '@/components/ProductCard';
import styles from './ProductsPage.module.css';

const productsData = {
  "data": [
    {
      "id": 5,
      "documentId": "evmc65zse0av6bpdb6qlz9yu",
      "Title": "Travel Insurance",
      "shortDescription": "The pleasure of traveling and visiting new countries is unmatched by any pleasure. Therefore, when you preparing for any new trip, do not forget to obtain a Travel Takaful Insurance program from Boubyan Takaful.",
      "Price": "Starting from 5.5 KD",
      "Category": "Travel",
      "image": {
        "id": 60,
        "documentId": "eeq6rxjxsg3m9478nzr35j1p",
        "url": "uploads/motor_product_tile_c0c6ea4c3a.jpg",
        "name": "motor-product-tile.jpg"
      },
      "Buttons": [
        {
          "id": 60,
          "label": "Details",
          "url": "https://uat.boubyantakaful.com/p/web/btic/products"
        },
        {
          "id": 61,
          "label": "Buy Now",
          "url": "https://uat.boubyantakaful.com/p/web/btic/products"
        }
      ]
    },
    {
      "id": 8,
      "documentId": "m0rpsfzxtziob9tdfma0wyqa",
      "Title": "Motor Insurance",
      "shortDescription": "The pleasure of traveling and visiting new countries is unmatched by any pleasure. Therefore, when you preparing for any new trip, do not forget to obtain a Travel Takaful Insurance program from Boubyan Takaful.",
      "Price": "Starting from 98 KD",
      "Category": "Motor",
      "image": {
        "id": 59,
        "documentId": "uw2rezlccsl7o3vgmkea2v8y",
        "url": "uploads/travel_product_tile_60c7495f1d.jpg",
        "name": "travel-product-tile.jpg"
      },
      "Buttons": [
        {
          "id": 64,
          "label": "Details",
          "url": "test"
        },
        {
          "id": 65,
          "label": "Buy Now",
          "url": "test"
        }
      ]
    },
    {
        "id": 9,
        "documentId": "m0rpsfzxtziob9tdfma0wyqa",
        "Title": "Property & Casualty",
        "shortDescription": "The pleasure of traveling and visiting new countries is unmatched by any pleasure. Therefore, when you preparing for any new trip, do not forget to obtain a Travel Takaful Insurance program from Boubyan Takaful.",
        "Price": "Starting from 111 KD",
        "Category": "Property & Casualty",
        "image": {
          "id": 59,
          "documentId": "uw2rezlccsl7o3vgmkea2v8y",
          "url": "uploads/motor_product_tile_c0c6ea4c3a.jpg",
          "name": "travel-product-tile.jpg"
        },
        "Buttons": [
          {
            "id": 64,
            "label": "Details",
            "url": "test"
          },
          {
            "id": 65,
            "label": "Buy Now",
            "url": "test"
          }
        ]
      }
  ]
};

const ProductsPage = () => {
  const [products, setProducts] = useState<StaticProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<StaticProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All Products');

  useEffect(() => {
    const productsDataTyped = productsData.data as StaticProduct[];
    setProducts(productsDataTyped);
    setFilteredProducts(productsDataTyped);
    
    const uniqueCategories = Array.from(new Set(productsDataTyped.map(p => p.Category)));
    setCategories(['All Products', ...uniqueCategories]);
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === 'All Products') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.Category === category));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Individual Products</h1>
        <p className={styles.description}>
          You will be able to plan and to live your life in greater confidence if you have a reliable insurance coverage. At Boubyan Takaful, we are committed to provide you and your family with comprehensive and cost-effective insurance solutions that are perfectly tailored to your personal needs.
        </p>
      </div>

      <div className={styles.tabs}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.tab} ${activeCategory === category ? styles.activeTab : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
