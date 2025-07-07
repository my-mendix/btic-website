// src/components/PremiumCalculations/DomesticPremiumCalculation.tsx
"use client";
import React from 'react';
import styles from './premiumCalculations.module.css';

const DomesticPremiumCalculation: React.FC = () => {
  const handleBuyNow = () => {
    // Redirect to purchase page or open modal
    alert('Redirecting to purchase page for Domestic Helper Insurance...');
  };

  return (
    <div className={styles.dynamicContainer}>
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Domestic Helper Insurance</h2>
      <div className={styles.actionsContainer}>
        <div className={styles.priceInfo}>
          <span className={styles.priceLabel}>Starting From</span>
          <span className={styles.priceValue}>9.500 KD</span>
        </div>
        <button onClick={handleBuyNow} className={styles.calculateButton}>
          Buy Now
        </button>
      </div>
    </section>
    </div>
  );
};
export default DomesticPremiumCalculation;