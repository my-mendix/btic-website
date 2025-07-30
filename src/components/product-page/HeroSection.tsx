
// src/components/product-page/HeroSection.tsx
import { HeroSectionComponent } from "@/types/strapiResponseDataTypes";
import { getStrapiMedia } from '@/lib/media';
import RichTextBlock from "./RichTextBlock";
import styles from './HeroSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  data: HeroSectionComponent;
}

const HeroSection: React.FC<Props> = ({ data }) => {
  const imageUrl = getStrapiMedia(data.image.data);
  const fallbackImageUrl = '/images/travel_images/travel-product-page-web.jpg';
  const imageAlt = data.image.data?.alternativeText ?? 'Product image';

  return (
    <section className={styles.heroSection}>
        <div className={styles.heroGrid}>            
            <div className={styles.heroImageContainer}>
                <Image
                    src={imageUrl || fallbackImageUrl}
                    alt={imageAlt}
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
                    {Array.isArray(data.buttons) && data.buttons.map((button) => (
                        <Link key={button.id} href={button.url} className={styles.heroCtaButton}>
                            {button.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
