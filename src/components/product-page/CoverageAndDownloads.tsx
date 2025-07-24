// src/components/product-page/CoverageAndDownloads.tsx
import React from 'react';
import Link from 'next/link';
import styles from '@/app/products/[slug]/ProductPage.module.css';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { CoverageListComponent, DownloadsBlockComponent } from '@/types/strapi';

interface Props {
  coverageData: CoverageListComponent; // In the future, this will hold a list of items
  downloadsData: DownloadsBlockComponent;
}

// NOTE: Hardcoded data based on screenshot. You should add a repeatable
// "coverage_item" field to your 'product.coverage-list' component in Strapi.
const staticCoverageItems = [
  "Delayed Departure / Flight Cancellation",
  "Baggage Delay or Loss",
  "Emergency Medical Expenses",
  "Loss of passport",
  "And other covered risks."
];

const CoverageAndDownloads: React.FC<Props> = ({ downloadsData }) => {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.title}>Coverage</h2>
        <ul className={styles.coverageList}>
          {staticCoverageItems.map((item, index) => (
            <li key={index} className={styles.coverageItem}>
              <FaArrowRight className={styles.coverageIcon} /> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.downloads}>
        <h2 className={styles.title}>Downloads</h2>
        <Link href="#" className={styles.downloadLink}>
          <FaDownload /> {downloadsData.fileLabel}
        </Link>
      </div>
    </section>
  );
};

export default CoverageAndDownloads;