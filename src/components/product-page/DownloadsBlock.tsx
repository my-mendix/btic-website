import React from 'react';
import styles from './DownloadsBlock.module.css';
import { FaDownload } from 'react-icons/fa';
import { DownloadsBlockComponent } from '@/types/strapi';

interface DownloadsBlockProps {
  data: DownloadsBlockComponent;
}

const DownloadsBlock: React.FC<DownloadsBlockProps> = ({ data }) => {
  const fileUrl = data.file?.url?.startsWith('http')
    ? data.file.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${data.file.url}`;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Downloads</h2>
      <a
        href={fileUrl}
        download={data.file.name}
        className={styles.downloadLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDownload className={styles.icon} />
        <span>{data.fileLabel}</span>
      </a>
    </div>
  );
};

export default DownloadsBlock;
