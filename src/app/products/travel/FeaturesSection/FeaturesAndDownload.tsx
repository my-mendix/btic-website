import React from 'react';
import styles from './FeaturesAndDownloads.module.css';
import { FaDownload, FaGift, FaShieldAlt, FaTags } from 'react-icons/fa';
import Link from 'next/link';

const data = {
  downloads: { title: "Downloads", file: { name: "Policy Wordings", href: "#" } },
  features: {
    title: "Our Features",
    items: [
      { icon: <FaGift />, name: "Daily Rewards" },
      { icon: <FaShieldAlt />, name: "Safety Features" },
      { icon: <FaTags />, name: "Special Promotions and Prizes" }
    ]
  }
};

const FeaturesAndDownloads: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.downloads}>
        <h2 className={styles.title}>{data.downloads.title}</h2>
        <Link href={data.downloads.file.href} className={styles.downloadLink}>
          <FaDownload />
          <span>{data.downloads.file.name}</span>
        </Link>
      </div>
      <div className={styles.features}>
        <h2 className={styles.title}>{data.features.title}</h2>
        <div className={styles.featureGrid}>
          {data.features.items.map((item, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{item.icon}</div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndDownloads;