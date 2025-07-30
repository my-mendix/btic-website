import React from 'react';
import styles from './DownloadsBlock.module.css';
import { FaDownload } from 'react-icons/fa';
import { DownloadsBlockComponent } from '@/types/strapiResponseDataTypes';

interface DownloadsBlockProps {
  data: DownloadsBlockComponent;
}

const DownloadsBlock: React.FC<DownloadsBlockProps> = ({ data }) => {
  if (!data.file?.data) {
    return null;
  }

  const fileUrl = data.file.data.url.startsWith('http')
    ? data.file.data.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${data.file.data.url}`;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Downloads</h2>
      <a
        href={fileUrl}
        download={data.file.data.name}
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
