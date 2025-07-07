// src/components/PremiumCalculations/MotorPremiumCalculation.tsx

"use client";

import React, { useState } from 'react';
import styles from './premiumCalculations.module.css'; // Using the generic CSS module

const MotorPremiumCalculation: React.FC = () => {
  // State for form fields
  const [vehicleBrand, setVehicleBrand] = useState('BMW');
  const [vehicleModel, setVehicleModel] = useState('1 Series 118i');
  const [modelYear, setModelYear] = useState('2024');
  const [marketValue, setMarketValue] = useState('25000');
  
  // State to manage API call and result
  const [isLoading, setIsLoading] = useState(false);
  const [calculatedPremium, setCalculatedPremium] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handler for form submission
  const handleCalculate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!vehicleBrand || !modelYear || !marketValue) {
      alert('Please fill in all required fields.');
      return;
    }

    // Reset state and start loading
    setIsLoading(true);
    setCalculatedPremium(null);
    setError(null);

    try {
      const response = await fetch('/api/calculate-motor-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: vehicleBrand,
          model: vehicleModel,
          year: modelYear,
          marketValue: marketValue,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors like 400 or 500
        throw new Error('Failed to calculate premium. Please try again.');
      }

      const data = await response.json();
      setCalculatedPremium(data.premium);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      // Stop loading regardless of success or failure
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy motor insurance with a premium of ${calculatedPremium?.toFixed(3)} KD.`);
    // Here you would redirect to a checkout page or next step in the user flow.
  }

  return (
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Motor Comprehensive Insurance</h2>
      <form onSubmit={handleCalculate}>
        <div className={styles.formGrid}>
          {/* Form fields... */}
          <div className={styles.formField}>
            <label htmlFor="vehicle-brand" className={styles.label}>Vehicle Brand</label>
            <select id="vehicle-brand" value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)} className={styles.select} required>
              <option value="BMW">BMW</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="vehicle-model" className={styles.label}>Vehicle Model</label>
            <select id="vehicle-model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} className={styles.select}>
              <option value="1 Series 118i">1 Series 118i</option>
              <option value="Camry">Camry</option>
              <option value="Accord">Accord</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="model-year" className={styles.label}>Model Year</label>
            <select id="model-year" value={modelYear} onChange={(e) => setModelYear(e.target.value)} className={styles.select} required>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label htmlFor="market-value" className={styles.label}>Vehicle Market Value</label>
            <input type="number" id="market-value" value={marketValue} onChange={(e) => setMarketValue(e.target.value)} className={styles.input} required/>
          </div>
        </div>
        
        {/* --- DYNAMIC ACTIONS CONTAINER --- */}
        <div className={styles.actionsContainer}>
          <p className={styles.disclaimer}>
            * A 45 year-old male office worker is assumed / Price may be changed based on the actual submitted Data
          </p>

          {/* Conditionally render based on calculation status */}
          {calculatedPremium === null ? (
            <button type="submit" className={styles.calculateButton} disabled={isLoading}>
              {isLoading ? 'Calculating...' : 'Calculate'}
            </button>
          ) : (
            <div className={styles.priceResultContainer}>
              <div className={styles.priceInfo}>
                <span className={styles.priceLabel}>Starting From</span>
                <span className={styles.priceValue}>{calculatedPremium.toFixed(3)} KD</span>
              </div>
              <button type="button" onClick={handleBuyNow} className={styles.calculateButton}>
                Buy Now
              </button>
            </div>
          )}
        </div>

        {/* Display error message if one exists */}
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </section>
  );
};

export default MotorPremiumCalculation;