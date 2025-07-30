// src/components/product-page/AddonsSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from './AddonsSection.module.css';
import { AddonsSectionComponent } from '@/types/strapiResponseDataTypes';
import { getStrapiMedia } from '@/lib/media'; 

interface AddonsSectionProps {
  data: AddonsSectionComponent;
}

const AddonsSection: React.FC<AddonsSectionProps> = ({ data }) => {
  // If there are no features, don't render the component
  if (!data.features || data.features.length === 0) {
    return null;
  }

  return (
    <section className={styles.addonsSection}>
      <h2 className={styles.addonsTitle}>{data.title}</h2>
      <div className={styles.addonsGrid}>
        {data.features.map((feature) => {
          const iconUrl = getStrapiMedia(feature.icon.data);
          return (
            <div key={feature.id} className={styles.addonCard}>
              {iconUrl && (
                <div className={styles.iconWrapper}>
                  <Image
                    src={iconUrl}
                    alt={feature.title}
                    width={60} // Set a display size for the icon
                    height={60}
                    className={styles.addonIcon}
                  />
                </div>
              )}
              <p className={styles.addonText}>{feature.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AddonsSection;
