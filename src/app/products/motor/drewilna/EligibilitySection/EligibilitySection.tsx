import React from 'react';
import styles from './EligibilitySection.module.css';
import { FaArrowRight } from 'react-icons/fa';

const eligibilityData = {
  introText: "Once user completes registration and activation of Drewilna Feature, User will be eligible for the Cashback according to his/her driving routine according to the following condition.",
  points: [
    "The policy is available for purchase exclusively via the Boubyan Takaful mobile application.",
    "User must complete 4000 km of driving during 12 months of driving.",
    "User must have a safety score that is higher than 8.5/10 to claim the additional cashback.",
    "The cashback rate on the annual premium is determined based on the final evaluation score after the end of the insurance period (12 months) Evaluation higher than 9/10 = 20% Cashback Evaluation higher than 8.5/10 = 15% Cashback",
    "The customer must submit a Cashback request according to the Cashback rate after the end of the policy period."
  ]
};

const EligibilitySection: React.FC = () => {
  return (
    <section className={styles.eligibilitySection}>
      <p className={styles.intro}>{eligibilityData.introText}</p>
      <ul className={styles.pointList}>
        {eligibilityData.points.map((point, index) => (
          <li key={index}>
            <FaArrowRight className={styles.icon} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EligibilitySection;