import React from "react";
import styles from "./CoverageList.module.css";

// Data interface matches the whole object you showed
interface CoverageListData {
  __component: string;
  id: number | string;
  items: {
    id: number | string;
    text: string;
    textAr: string;
  }[];
  title?: string;
  title_ar?: string;
}

interface Props {
  data: CoverageListData;
  lang: string;
}

const CoverageList: React.FC<Props> = ({ data, lang }) => {
  const isArabic = lang === 'ar';
  const title = isArabic ? data.title_ar : data.title;
  const items = isArabic ? data.items.map(item => ({ ...item, text: item.textAr })) : data.items;

  return (
    <section className={styles.coverageSection}>
      <h2 className={styles.coverageTitle}>{title ?? "Coverage"}</h2>
      <ul className={styles.coverageList}>
        {items.map((item) => (
          <li className={styles.coverageListItem} key={item.id}>
            <span className={styles.coverageBullet}></span>
            <span>
              {item.text ? item.text.trim().replace(/^[0-9]+\.\s*/, "") : ''}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CoverageList;
