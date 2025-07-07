// src/components/PremiumCalculations/TravelPremiumCalculation.tsx
"use client";
import React, { useState } from 'react';
import styles from './premiumCalculations.module.css';

const TravelPremiumCalculation: React.FC = () => {
  const [coverageType, setCoverageType] = useState('');
  const [coveragePeriod, setCoveragePeriod] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Calculating Travel Insurance for ${coverageType} plan for ${coveragePeriod} days.`);
  };

  return (
    <div className={styles.dynamicContainer}>
      <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Travel Insurance</h2>
      <form onSubmit={handleCalculate}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="coverage-type" className={styles.label}>Coverage Type</label>
            <select id="coverage-type" value={coverageType} onChange={(e) => setCoverageType(e.target.value)} className={styles.select} required>
              <option value="" disabled>Select Type</option>
              <option value="Worldwide">Worldwide</option>
              <option value="Schengen">Schengen</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="coverage-period" className={styles.label}>Coverage period (days)</label>
            <select id="coverage-period" value={coveragePeriod} onChange={(e) => setCoveragePeriod(e.target.value)} className={styles.select} required>
              <option value="" disabled>Select Period</option>
              <option value="7">7 Days</option>
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
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
export default TravelPremiumCalculation;