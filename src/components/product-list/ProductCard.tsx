// src/components/product-list/ProductCard.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductTile } from '@/types/strapiResponseDataTypes'; // <-- Use the correct type
import styles from './ProductListPage.module.css'; // <-- Assuming this is your CSS module
import { getStrapiURL } from '@/lib/config'; // <-- Assuming this is your helper

interface ProductCardProps {
  product: ProductTile; // <-- Use the correct prop type
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.image ? `${getStrapiURL()}${product.image.url}` : '/images/placeholder.png';

  // Find the specific buttons from the array
  const detailsButton = product.Buttons.find(button => button.label.toLowerCase() === 'details');
  const buyNowButton = product.Buttons.find(button => button.label.toLowerCase() === 'buy now');

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <Image
          src={imageUrl}
          alt={product.Title}
          className={styles.cardImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{product.Title}</h3>
        <p className={styles.cardDescription}>{product.shortDescription}</p>
        <div className={styles.cardFooter}>
          <div className={styles.priceInfo}>{product.Price}</div>
          <div className={styles.buttonGroup}>
            {detailsButton && (
              <Link href={detailsButton.url} className={styles.detailsButton}>
                {detailsButton.label}
              </Link>
            )}
            {buyNowButton && (
              <Link href={buyNowButton.url} className={styles.buyButton}>
                {buyNowButton.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;