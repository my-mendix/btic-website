// src/components/drewilna/VideoModal.tsx
"use client";

import React from 'react';
import styles from './VideoModal.module.css';
import { FaTimes } from 'react-icons/fa';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;

  // Construct the YouTube embed URL with autoplay
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close video player">
          <FaTimes />
        </button>
        <div className={styles.videoWrapper}>
          <iframe
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;