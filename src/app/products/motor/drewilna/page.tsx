import React from 'react';
import DrewilnaHero from './DrewilnaHero'
// import InstructionalVideos from './InstructionalVideos';
// import EligibilitySection from '@/components/drewilna/EligibilitySection';
// import FeaturesAndDownloads from '@/components/drewilna/FeaturesAndDownloads';
// import FaqSection from '@/components/drewilna/FaqSection';
// import AppCallToAction from '@/components/drewilna/AppCallToAction';
import styles from './DrewilnaPage.module.css';
import NewsSection from './InstructionalVideos/NewsSection';

export default function DrewilnaPage() {
  return (
    <main>
      <div className={styles.pageContainer}>
        <DrewilnaHero />
      </div>
      
      {/* <InstructionalVideos /> */}
      < NewsSection />

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