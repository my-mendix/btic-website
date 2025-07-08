import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './InstructionalVideos.module.css';
import { FaPlayCircle } from 'react-icons/fa';

const videoData = {
  title: "Instructional Videos",
  videos: [
    { thumbnailSrc: "/images/video-thumbnail-1.png", title: "How to enable Drewilna Settings?", videoUrl: "#" },
    { thumbnailSrc: "/images/video-thumbnail-2.png", title: "How can the Driver Activate Drewilna?", videoUrl: "#" },
    { thumbnailSrc: "/images/video-thumbnail-3.png", title: "How can The Policyholder connect to the Driver?", videoUrl: "#" }
  ]
};

const InstructionalVideos: React.FC = () => {
  return (
    <section className={styles.videoSection}>
      <h2 className={styles.title}>{videoData.title}</h2>
      <div className={styles.videoGrid}>
        {videoData.videos.map((video, index) => (
          <div key={index} className={styles.videoCard}>
            <Link href={video.videoUrl} target="_blank" className={styles.thumbnailLink}>
              <Image src={video.thumbnailSrc} alt={video.title} width={400} height={225} />
              <FaPlayCircle className={styles.playIcon} />
            </Link>
            <h3 className={styles.videoTitle}>{video.title}</h3>
            <Link href={video.videoUrl} target="_blank" className={styles.playLink}>Play Video</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstructionalVideos;