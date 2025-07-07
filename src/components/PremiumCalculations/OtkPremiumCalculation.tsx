// src/components/PremiumCalculations/OtkPremiumCalculation.tsx

"use client";

import React, { useState } from 'react';
import styles from './premiumCalculations.module.css'; // Using the generic CSS module

const OtkPremiumCalculation: React.FC = () => {
  // State for the single form field
  const [sumInsured, setSumInsured] = useState('');

  // Handler for form submission
  const handleCalculate = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload

    if (!sumInsured) {
      alert('Please select a Sum Insured amount.');
      return;
    }

    // In a real application, you would perform a calculation or API call here.
    alert(`Calculating One-Third Alkhayrat Insurance for a Sum Insured of ${sumInsured}.`);
  };

  return (
    <div className={styles.dynamicContainer}>
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>One-Third Alkhayrat Insurance</h2>
      <form onSubmit={handleCalculate}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="sum-insured" className={styles.label}>Sum Insured</label>
            <select
              id="sum-insured"
              value={sumInsured}
              onChange={(e) => setSumInsured(e.target.value)}
              className={styles.select}
              required
            >
              <option value="" disabled>Select Amount</option>
              <option value="5000 KD">5,000 KD</option>
              <option value="10000 KD">10,000 KD</option>
              <option value="15000 KD">15,000 KD</option>
              <option value="20000 KD">20,000 KD</option>
            </select>
          </div>
        </div>

        {/* This container pushes the button to the far right */}
        <div className={styles.actionsContainerEnd}>
          <button type="submit" className={styles.calculateButton}>
            Calculate
          </button>
        </div>
      </form>
    </section>
    </div>
  );
};

export default OtkPremiumCalculation;