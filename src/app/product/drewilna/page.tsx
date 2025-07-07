import React from 'react';
import DrewilnaHero from './DrewilnaHero'
// import InstructionalVideos from '@/components/drewilna/InstructionalVideos';
// import EligibilitySection from '@/components/drewilna/EligibilitySection';
// import FeaturesAndDownloads from '@/components/drewilna/FeaturesAndDownloads';
// import FaqSection from '@/components/drewilna/FaqSection';
// import AppCallToAction from '@/components/drewilna/AppCallToAction';
import styles from './DrewilnaPage.module.css';

export default function DrewilnaPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <DrewilnaHero />
      </div>
      
      {/* <InstructionalVideos /> */}

      <div className={styles.pageContainer}>
        {/* <EligibilitySection /> */}
      </div>
      
      {/* <FeaturesAndDownloads /> */}

      <div className={styles.pageContainer}>
        {/* <FaqSection /> */}
      </div>

      {/* <AppCallToAction /> */}
    </main>
  );
}