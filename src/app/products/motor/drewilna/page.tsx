import React from 'react';
import DrewilnaHero from './DrewilnaHero'
// import InstructionalVideos from './InstructionalVideos';
import EligibilitySection from './EligibilitySection/EligibilitySection';
import FeaturesAndDownloads from './FeaturesSection/FeaturesAndDownload';
import styles from './DrewilnaPage.module.css';
import InstructionalVideos from './InstructionalVideos/InstructionalVideos';

export default function DrewilnaPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <DrewilnaHero />
        <EligibilitySection />
        <FeaturesAndDownloads />
        <InstructionalVideos />
      </div>
    </main>
  );
}