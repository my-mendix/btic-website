// src/components/NewsArticleCard.tsx

import React from 'react';
import Image from 'next/image'; // <-- 1. Import Next.js Image component
import Link from 'next/link';   // <-- 2. Import Next.js Link component

export interface TilesCardProps {
  imageUrl: string;
  title: string;
  description: string;
  articleUrl: string; // This should be a relative path like '/news/my-article'
}

const TilesCard: React.FC<TilesCardProps> = ({
  imageUrl,
  title,
  description,
  articleUrl,
}) => {
  return (
    // We'll use CSS Modules for styling, so the className will come from props or be defined in the parent
    <div className="news-card"> 
      {/* Use the next/image component for optimized images */}
      <Image
        src={imageUrl}
        alt={title}
        width={400} // Provide width and height to prevent layout shift
        height={200}
        className="news-card-image"
      />
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
        {/* Use the next/link component for pre-fetching and client-side routing */}
        <Link href={articleUrl} className="news-card-link">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default TilesCard;