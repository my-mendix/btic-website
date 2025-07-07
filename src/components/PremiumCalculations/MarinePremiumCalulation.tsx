// src/components/PremiumCalculations/MarinePremiumCalculation.tsx
"use client";
import React, { useState } from 'react';
import styles from './premiumCalculations.module.css';

const MarinePremiumCalculation: React.FC = () => {
  const [vesselType, setVesselType] = useState('');
  const [limitOfLiability, setLimitOfLiability] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Calculating Marine TPL Insurance for ${vesselType} with a limit of ${limitOfLiability}.`);
  };

  return (
    <div className={styles.dynamicContainer}>
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Marine TPL Insurance</h2>
      <form onSubmit={handleCalculate}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="vessel-type" className={styles.label}>Vessel Type</label>
            <select id="vessel-type" value={vesselType} onChange={(e) => setVesselType(e.target.value)} className={styles.select} required>
              <option value="" disabled>Select Type</option>
              <option value="Yacht">Yacht</option>
              <option value="Jet Ski">Jet Ski</option>
              <option value="Boat">Boat</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="limit-liability" className={styles.label}>Limit of liability</label>
            <select id="limit-liability" value={limitOfLiability} onChange={(e) => setLimitOfLiability(e.target.value)} className={styles.select} required>
              <option value="" disabled>Select Limit</option>
              <option value="100000">100,000 KD</option>
              <option value="250000">250,000 KD</option>
              <option value="500000">500,000 KD</option>
            </select>
          </div>
        </div>
        <div className={styles.actionsContainerEnd}>
          <button type="submit" className={styles.calculateButton}>Calculate</button>
        </div>
      </form>
    </section>
    </div>
  );
};
export default MarinePremiumCalculation;