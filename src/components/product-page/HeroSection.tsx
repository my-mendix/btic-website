
// src/components/product-page/HeroSection.tsx
import { HeroSectionComponent } from "@/types/strapi";
import { getStrapiMedia } from '@/types/strapi';
import RichTextBlock from "./RichTextBlock";
import styles from './HeroSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



interface Props {
  data: HeroSectionComponent;
  // NOTE: The image and buttons are not in your Strapi data yet.
  // I'm adding them here based on the screenshot. You should add these fields
  // to your 'product.hero-section' component in Strapi.
  imageSrc?: string; 
}

const HeroSection: React.FC<Props> = ({ data }) => {
  // const imageUrl = data.image ? getStrapiMedia(data.image) : null;
  const imageUrl = getStrapiMedia(data.image) || '/images/travel_images/travel-product-page-web.jpg';
  console.log('HeroSection imageUrl :', imageUrl);
//   console.log('HeroSection data :', data);


  return (
    <section className={styles.heroSection}>
        <div className={styles.heroGrid}>            
            <div className={styles.heroImageContainer}>
                <Image
                    src={imageUrl ?? ''}
                    alt={data.image.alternativeText ?? 'Product image'}
                    width={600}
                    height={400}
                    priority
                />
            </div>
            <div className={styles.heroTextContainer}>            
                <h1 className={styles.heroTitle}>{data.title}</h1>
                <div className={styles.heroDescription}>
                    <RichTextBlock nodes={data.description} />
                </div>
                <div className={styles.heroButtonGroup}>
                    {data.buttons && (
                        <Link href={data.buttons.url} className={styles.heroCtaButton}>
                            {data.buttons.label}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;