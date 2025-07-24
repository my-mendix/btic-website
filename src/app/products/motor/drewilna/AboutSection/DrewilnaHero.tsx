import React from 'react';
import Image from 'next/image';
import styles from './DrewilnaHero.module.css';

const heroData = {
  introductionTitle: "Introduction",
  introductionText: "The all new and most advanced Drewilna policy from Boubyan Takaful gives you the opportunity to get a Cashback up to 20% on your annual premium.",
  drewilnaTitle: "What is Drewilna?",
  drewilnaParagraphs: [
    "Drewilna is a comprehensive and interactive motor insurance policy that aims to provide our customers with the best experience. The policy is identical to the standard motor comprehensive policy in terms of coverage and insurance terms, in addition to giving the customer the opportunity to obtain a Cashback up to 20% on the annual premium, depending on the driving behavior.",
    "Distinguished by its unique feature Drewilna gives the user the capability to monitor and assess the driving behavior of the home driver via the Takaful app.",
    // ... Add all other paragraphs from your JSON here
  ],
  imageSrc: "/images/drewilna-product-page.jpg", // Make sure this image is in your /public folder
  imageAlt: "A family enjoying a safe drive"
};

const DrewilnaHero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.introText}>
        <h2>{heroData.introductionTitle}</h2>
        <p>{heroData.introductionText}</p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.imageContainer}>
          <Image src={heroData.imageSrc} alt={heroData.imageAlt} width={500} height={400} />
        </div>
        <div className={styles.textContainer}>
          <h2>{heroData.drewilnaTitle}</h2>
          {heroData.drewilnaParagraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DrewilnaHero;