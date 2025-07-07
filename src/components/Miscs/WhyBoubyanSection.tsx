// src/components/WhyBoubyanSection.tsx

import React from 'react';
import Image from 'next/image';
import styles from './WhyBoubyanSection.module.css';

const WhyBoubyanSection: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>
        Why Boubyan Takaful?
      </h2>
      
      <div className={styles.imageWrapper}>
        <Image
          // IMPORTANT: Place your image in the `public` folder and update the path here.
          src='/images/why_boubyan.jpg' 
          alt="Boubyan Takaful staff assisting a client in a modern office environment"
          width={1160} // The natural width of your image
          height={500} // The natural height of your image
          className={styles.sectionImage}
          priority // Add this if the image is visible on initial page load (above the fold)
        />
      </div>

      <p className={styles.sectionDescription}>
        Boubyan Takaful Insurance Company (BTIC) is committed to serving you with high-quality insurance products and plans that make your life easier and better. With a variety of plans to accommodate your insurance needs and a robust digital platform to maintain our standard of excellence, we establish a relationship of mutual trust and good service with each of our clients that thrives on our financial strength.
      </p>
    </section>
  );
};

export default WhyBoubyanSection;