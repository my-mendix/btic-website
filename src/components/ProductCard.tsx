import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticProduct } from '@/types/strapi';
import styles from './ProductCard.module.css';
import { getStrapiURL } from '@/lib/config';

interface ProductCardProps {
  product: StaticProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.image ? `${getStrapiURL()}${product.image.url}` : '/images/default-product.png';
  console.log(`Product image URL: ${imageUrl}`);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={product.Title}
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.Title}</h3>
        <div className={styles.description}>
          <p>{product.shortDescription}</p>
        </div>
        <div className={styles.price}>
          {product.Price}
        </div>
        <div className={styles.buttons}>
          {product.Buttons.map(button => (
            <Link key={button.id} href={button.url} className={button.label === 'Details' ? styles.detailsButton : styles.buyButton}>
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
