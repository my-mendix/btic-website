import React from 'react';
import styles from './DownloadsBlock.module.css';
import { FaDownload } from 'react-icons/fa';
import { DownloadsBlockComponent } from '@/types/strapiResponseDataTypes';
import { getStrapiURL } from '@/lib/config';

interface DownloadsBlockProps {
  data: DownloadsBlockComponent;
  lang: string;
}

const DownloadsBlock: React.FC<DownloadsBlockProps> = ({ data, lang }) => {
  const isArabic = lang === 'ar';
  const title = isArabic ? data.title_ar : data.title;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.linksContainer}>
        {Array.isArray(data.file) &&
          data.file.map((fileItem) => {
            const fileLabel = isArabic ? fileItem.label_ar : fileItem.label;
            const file = isArabic ? fileItem.file_ar : fileItem.file;

            if (!file) {
              return null;
            }

            const fileUrl = file.url.startsWith('http')
              ? file.url
              : `${getStrapiURL()}${file.url}`;

            return (
              <a
                key={fileItem.id}
                href={fileUrl}
                download={file.name}
                className={styles.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload className={styles.icon} />
                <span className={styles.label}>{fileLabel}</span>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default DownloadsBlock;
