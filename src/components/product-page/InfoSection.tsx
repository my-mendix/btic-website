
// src/components/product-page/Hero.tsx
import styles from './HeroSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { HeroComponent } from '@/types/strapiResponseDataTypes';
import { getStrapiURL } from '@/lib/config';

interface Props extends HeroComponent {
  lang: string;
}

const Hero: React.FC<Props> = ({ title, title_ar, description, description_ar, image,buttons, lang }) => {
  const isArabic = lang === 'ar';
  const heroTitle = isArabic ? title_ar : title;
  const heroDescription = isArabic ? description_ar : description;
  const imageUrl = image?.url ? `${getStrapiURL()}${image.url}` : null;
  const fallbackImageUrl = '/images/travel_images/travel-product-page-web.jpg';

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroGrid}>
        <div className={styles.heroImageContainer}>
          <Image
            src={imageUrl || fallbackImageUrl}
            alt={'Hero Image'}
            width={600}
            height={400}
            priority
          />
        </div>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          <div className={styles.heroDescription}>
            <ReactMarkdown>{heroDescription || ''}</ReactMarkdown>
          </div>
          <div className={styles.heroButtonGroup}>
            {Array.isArray(buttons) &&
              buttons.map((button) => {
                const buttonUrl = isArabic ? button.url_ar : button.url;
                const buttonLabel = isArabic ? button.label_ar : button.label;
                return (
                  <Link key={button.id} href={buttonUrl} className={styles.heroCtaButton}>
                    {buttonLabel}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
