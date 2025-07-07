'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TilesCard, { TilesCardProps } from './TilesCard';
import styles from './NewsSection.module.css';
import { fetchFromStrapi } from '@/lib/strapiApi';
import {STRAPI_URL} from '@/lib/config';
import { ImageData, TextBlock } from '@/data/strapi';

interface NewsItem {
  id: number;
  title: string;
  description: TextBlock[];
  articleUrl?: string | null;
  publishedAt: string;
  image?: ImageData;
}

interface StrapiResponse {
  data: NewsItem[];
}

const NewsSection = () => {
  const [news, setNews] = useState<TilesCardProps[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data: StrapiResponse = await fetchFromStrapi(
          '/api/news-sections?populate=*&sort=publishedAt:desc&pagination[limit]=3'
        );

        const articles = data.data.map((item) => {
          const descriptionText = item.description
            .map((block) =>
              block.children.map((child) => child.text).join(' ')
            )
            .join(' ');

          const imageUrl = item.image?.url
            ? `${STRAPI_URL}${item.image.url}`
            : '/placeholder.png';

          return {
            imageUrl,
            title: item.title,
            description: descriptionText,
            articleUrl:
              item.articleUrl && item.articleUrl !== '""'
                ? item.articleUrl.replace(/"/g, '')
                : `/news/${item.id}`,
          };
        });

        setNews(articles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className={styles.newsSection}>
      <div className={styles.newsSectionHeader}>
        <h2 className={styles.newsSectionTitle}>Latest News</h2>
        <Link href="/news" className={styles.newsSectionViewAll}>
          View All
        </Link>
      </div>
      <div className={styles.newsGrid}>
        {news.map((article) => (
          <TilesCard key={article.title} {...article} />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
