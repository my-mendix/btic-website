// src/components/home/TestimonialCard.tsx
import React from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css'; // Will be created next

interface TestimonialCardProps {
  iconSrc: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ iconSrc, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Image src={iconSrc} alt="Testimonial icon" width={48} height={48} />
        <div className={styles.quoteIcon}>”</div>
      </div>
      <p className={styles.cardText}>{text}</p>
    </div>
  );
};

export default TestimonialCard;