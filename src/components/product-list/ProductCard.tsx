// src/components/product-list/ProductCard.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductTile, ProductButton } from '@/types/strapiResponseDataTypes'; // <-- Use the correct type
import styles from './ProductListPage.module.css'; // <-- Assuming this is your CSS module
import { getStrapiURL } from '@/lib/config'; // <-- Assuming this is your helper

interface ProductCardProps {
  product: ProductTile; // <-- Use the correct prop type
  lang: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang }) => {
  const imageUrl = product.cardImage ? `${getStrapiURL()}${product.cardImage.url}` : '/images/placeholder.png';

  // Find the specific buttons from the array
  const detailsButton = product.cardButtons.find(button => button.label.toLowerCase() === 'details');
  const buyNowButton = product.cardButtons.find(button => button.label.toLowerCase() === 'buy now');

  const getLabel = (button: ProductButton) => (lang === 'ar' ? button.label_ar : button.label) || '';
  const getUrl = (button: ProductButton) => (lang === 'ar' ? button.url_ar : button.url) || '#';
  const title = (lang === 'ar' ? product.title_ar : product.title) || '';
  const shortDescription = (lang === 'ar' ? product.shortDescription_ar : product.shortDescription) || '';
  const minimumPriceText = (lang ==='ar' ? `ابتداءا من ${product.minimumPrice} د.ك` : `Starting From ${product.minimumPrice} KD`);

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <Image
          src={imageUrl}
          alt={product.title}
          className={styles.cardImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{shortDescription}</p>
        <div className={styles.cardFooter}>
          <div className={styles.priceInfo}>{minimumPriceText}</div>
          <div className={styles.buttonGroup}>
            {detailsButton && (
              <Link href={getUrl(detailsButton)} className={styles.detailsButton}>
                {getLabel(detailsButton)}
              </Link>
            )}
            {buyNowButton && (
              <Link href={getUrl(buyNowButton)} className={styles.buyButton}>
                {getLabel(buyNowButton)}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
