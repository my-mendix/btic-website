"use client";
import React, { useState } from 'react';
import styles from './premiumCalculations.module.css';

const HouseholdPremiumCalculation: React.FC = () => {
  const [coverageType, setCoverageType] = useState('');
  const [basicCoverage, setBasicCoverage] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Calculating Household Insurance for ${coverageType} with ${basicCoverage} coverage.`);
  };

  return (
    <div className={styles.dynamicContainer}>
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Household Insurance</h2>
        <form onSubmit={handleCalculate}>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label htmlFor="coverage-type" className={styles.label}>Coverage Type</label>
              <select id="coverage-type" value={coverageType} onChange={(e) => setCoverageType(e.target.value)} className={styles.select} required>
                <option value="" disabled>Select Type</option>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label htmlFor="basic-coverage" className={styles.label}>Basic Coverage</label>
              <select id="basic-coverage" value={basicCoverage} onChange={(e) => setBasicCoverage(e.target.value)} className={styles.select} required>
                <option value="" disabled>Select Coverage</option>
                <option value="25000">25,000 KD</option>
                <option value="50000">50,000 KD</option>
                <option value="75000">75,000 KD</option>
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
export default HouseholdPremiumCalculation;