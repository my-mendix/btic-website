import React from 'react';


import styles from './AboutSection/DrewilnaPage.module.css';
import DrewilnaHero from './AboutSection/DrewilnaHero';
import EligibilitySection from './EligibilitySection/EligibilitySection';
import FeaturesAndDownloads from './FeaturesSection/FeaturesAndDownload';
import InstructionalVideos from './InstructionalVideos/InstructionalVideos';
import FaqSection from './FAQ/FaqSection';

export default function DrewilnaPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <DrewilnaHero />
        <InstructionalVideos />
        <EligibilitySection />
        <FeaturesAndDownloads />
        <FaqSection  productName="Drewilna" />
      </div>
    </main> 
  );
}