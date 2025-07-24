// src/components/drewilna/VideoCard.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './InstructionalVideos.module.css'; // Will share the parent's CSS
import { FaPlay } from 'react-icons/fa';

interface VideoCardProps {
  title: string;
  thumbnail1: string; // The default image
  thumbnail2: string; // The image on hover
  onPlay: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail1, thumbnail2, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.videoCard}>
      <div
        className={styles.thumbnailContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onPlay}
      >
        <Image
          src={isHovered ? thumbnail2 : thumbnail1}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.thumbnailImage}
        />
        <div className={styles.overlay}>
          <div className={styles.youtubeBadge}>
            Watch on <span>YouTube</span>
          </div>
          <FaPlay className={styles.playIcon} />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.videoTitle}>{title}</h3>
        <button onClick={onPlay} className={styles.playLink}>
          <FaPlay /> Play Video
        </button>
      </div>
    </div>
  );
};

export default VideoCard;