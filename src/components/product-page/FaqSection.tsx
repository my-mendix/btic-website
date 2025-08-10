// src/components/product-page/FaqSection.tsx
'use client';
import React, { useState } from "react";
import styles from "./FaqSection.module.css";
import Image from "next/image";
import { Faq } from "@/types/strapiResponseDataTypes";
import RichTextBlock from "./RichTextBlock";

interface Props {
  faqs: Faq[];
  imageSrc?: string;
}

const FaqSection: React.FC<Props> = ({ faqs, imageSrc }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqGrid}>
        <div className={styles.faqList}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          {Array.isArray(faqs) && faqs.map((faq, idx) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestionRow}
                aria-expanded={openIndex === idx}
                onClick={() => handleToggle(idx)}
              >
                <span className={styles.faqQuestion}>{faq.question}</span>
                <span className={styles.faqIcon}>{openIndex === idx ? "−" : "+"}</span>
              </button>
              <div
                className={`${styles.faqAnswerWrap} ${openIndex === idx ? styles.open : ""}`}
                aria-hidden={openIndex !== idx}
              >
                <div className={styles.faqAnswer}>
                  <RichTextBlock nodes={faq.answer} />
                </div>
              </div>
            </div>
          ))}
          <button className={styles.faqViewAllBtn}>View all FAQs</button>
        </div>
        <div className={`${styles.faqImageCol} hidden md:block`}>
          <Image
            src={imageSrc || "/images/faq-illustration.jpg"}
            alt="FAQ illustration"
            width={390}
            height={270}
            className={styles.faqImage}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
