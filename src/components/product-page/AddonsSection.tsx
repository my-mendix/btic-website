// src/components/product-page/AddonsSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './AddonsSection.module.css';
import { AddonsSectionComponent } from '@/types/strapiResponseDataTypes';
import { getStrapiMedia } from '@/lib/media';

interface AddonsSectionProps {
  data: AddonsSectionComponent;
  lang: string;
}

const AddonsSection: React.FC<AddonsSectionProps> = ({ data, lang }) => {
  const isArabic = lang === 'ar';
  const title = isArabic ? data.title_ar : data.title;

  // If there are no features, don't render the component
  if (!data.addonFeature || data.addonFeature.length === 0) {
    return null;
  }

  return (
    <section className={styles.addonsSection}>
      <h2 className={styles.addonsTitle}>{title}</h2>
      <div className={styles.addonsGrid}>
        {data.addonFeature.map((feature) => {
          const featureTitle = isArabic ? feature.title_ar : feature.title;
          const featureDescription = isArabic ? feature.description_ar : feature.description;
          const iconUrl = getStrapiMedia(feature.image);
          return (
            <div key={feature.id} className={styles.addonCard}>
              {iconUrl && (
                <div className={styles.iconWrapper}>
                  <Image
                    src={iconUrl}
                    alt={featureTitle}
                    width={60} // Set a display size for the icon
                    height={60}
                    className={styles.addonIcon}
                  />
                </div>
              )}
              <h3 className={styles.addonTitle}>{featureTitle}</h3>
              <p className={styles.addonText}>{featureDescription}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AddonsSection;
