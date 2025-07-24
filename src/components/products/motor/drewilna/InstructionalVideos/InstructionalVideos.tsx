// src/components/drewilna/InstructionalVideos.tsx
"use client";

import React, { useEffect, useState } from 'react';
import styles from './InstructionalVideos.module.css';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';
import { fetchFromStrapi } from '@/lib/strapiApi';
import { STRAPI_URL } from '@/lib/config';

// Strapi image type
interface StrapiImage {
  id: number;
  url: string;
//   [key: string]: any; // You can further type this if needed
}

// Strapi video item type
interface StrapiVideoItem {
  id: number;
  title: string;
  videoId: string;
  before_hover_image?: StrapiImage | null;
  after_hover_image?: StrapiImage | null;
}

// Strapi response type
interface StrapiVideoResponse {
  data: StrapiVideoItem[];
}

interface VideoItem {
  id: number;
  title: string;
  videoId: string;
  thumbnail1?: { url: string };
  thumbnail2?: { url: string };
}

const InstructionalVideos: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res: StrapiVideoResponse = await fetchFromStrapi(
          '/api/instructional-videos?populate=*'
        );
        const videoList: VideoItem[] = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          videoId: item.videoId,
          thumbnail1: item.before_hover_image
            ? { url: `${STRAPI_URL}${item.before_hover_image.url}` }
            : undefined,
          thumbnail2: item.after_hover_image
            ? { url: `${STRAPI_URL}${item.after_hover_image.url}` }
            : undefined,
        }));
        setVideos(videoList);
      } catch (error) {
        console.error('Failed to fetch instructional videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const handleOpenModal = (videoId: string) => {
    setCurrentVideoId(videoId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideoId('');
  };

  return (
    <>
      <section className={styles.videoSection}>
        <h2 className={styles.title}>Instructional Videos</h2>
        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              thumbnail1={video.thumbnail1?.url || '/images/video-thumb1-normal.jpg'}
              thumbnail2={video.thumbnail2?.url || '/images/video-thumb1-hover.jpg'}
              onPlay={() => handleOpenModal(video.videoId)}
            />
          ))}
        </div>
      </section>
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoId={currentVideoId}
      />
    </>
  );
};

export default InstructionalVideos;