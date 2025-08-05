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
}

interface Props {
  data: CoverageListData;
  lang: string;
}

const CoverageList: React.FC<Props> = ({ data , lang}) => (
  <section className={styles.coverageSection}>
    <h2 className={styles.coverageTitle}>{data.title ?? "Coverage"}</h2>
    <ul className={styles.coverageList}>
      {data.items.map((item) => (
        <li className={styles.coverageListItem} key={item.id}>
          <span className={styles.coverageBullet}></span>
          <span>
            {lang === 'en' ? item.text.trim().replace(/^[0-9]+\.\s*/, "") : item.textAr}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default CoverageList;
