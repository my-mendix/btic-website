// src/components/drewilna/AccordionItem.tsx

import React from 'react';
import styles from './FaqSection.module.css'; // Note: It shares the parent's CSS
import { FaPlus, FaMinus } from 'react-icons/fa';

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode; // Use ReactNode to allow complex content like paragraphs
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onClick} aria-expanded={isOpen}>
        <span className={styles.questionText}>{question}</span>
        <span className={styles.iconWrapper}>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </button>
      <div className={`${styles.accordionContent} ${isOpen ? styles.isOpen : ''}`}>
        <div className={styles.accordionContentInner}>
          {answer}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;