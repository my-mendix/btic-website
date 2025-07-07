// src/components/PremiumCalculations/MedicalMalpracticePremiumCalculation.tsx
"use client";
import React, { useState } from 'react';
import styles from './premiumCalculations.module.css';

const MedicalMalpracticePremiumCalculation: React.FC = () => {
  const [specialization, setSpecialization] = useState('');
  const [limitsOfInsurance, setLimitsOfInsurance] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Calculating Medical Malpractice Insurance for ${specialization} with a limit of ${limitsOfInsurance}.`);
  };

  return (
    <div className={styles.dynamicContainer}>
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Medical Malpractice Insurance</h2>
      <form onSubmit={handleCalculate}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label htmlFor="specialization" className={styles.label}>Specialization</label>
            <select id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className={styles.select} required>
              <option value="" disabled>Select Specialization</option>
              <option value="General Practitioner">General Practitioner</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Dentist">Dentist</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="limits" className={styles.label}>Limits of Insurance</label>
            <select id="limits" value={limitsOfInsurance} onChange={(e) => setLimitsOfInsurance(e.target.value)} className={styles.select} required>
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
export default MedicalMalpracticePremiumCalculation;