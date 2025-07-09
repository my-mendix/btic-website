import React from 'react';
import DrewilnaHero from './DrewilnaHero'
// import InstructionalVideos from './InstructionalVideos';
import EligibilitySection from './EligibilitySection/EligibilitySection';
import FeaturesAndDownloads from './FeaturesSection/FeaturesAndDownload';
import InstructionalVideos from './InstructionalVideos/InstructionalVideos';
import FaqSection from './FAQ/FaqSection';
import styles from './DrewilnaPage.module.css';

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