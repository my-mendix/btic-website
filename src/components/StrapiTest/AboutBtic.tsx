'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './AboutBtic.module.css';
import { fetchFromStrapi } from '@/lib/strapiApi';
import { ImageData, TextBlock } from '@/data/strapi';
import { STRAPI_URL } from '@/lib/config';

interface AboutItem {
  id: number;
  title: string;
  paragraph: TextBlock[];
  image?: ImageData;
}

interface StrapiResponse {
  data: AboutItem[];
}

const AboutBtic: React.FC = () => {
  const [content, setContent] = useState<{
    title: string;
    paragraph: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data: StrapiResponse = await fetchFromStrapi('/api/homepages?populate=*');

        if (data.data.length > 0) {
          const item = data.data[0];

          const paragraphText = item.paragraph
            .map((block) =>
              block.children.map((child) => child.text).join(' ')
            )
            .join('\n');

          const imageUrl = item.image?.url
            ? `${STRAPI_URL}${item.image.url}`
            : '/placeholder.png';

          setContent({
            title: item.title,
            paragraph: paragraphText,
            imageUrl,
          });
        }
      } catch (error) {
        console.error('Failed to fetch About BTIC content:', error);
      }
    };

    fetchAbout();
  }, []);

  if (!content) return <p>Loading...</p>;

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{content.title}</h2>
      {content.imageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={content.imageUrl}
            alt={content.title}
            width={1160}
            height={500}
            className={styles.sectionImage}
            priority
          />
        </div>
      )}
      <p className={styles.sectionDescription}>{content.paragraph}</p>
    </section>
  );
};

export default AboutBtic;
