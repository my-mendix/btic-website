"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FaqSection.module.css';
import AccordionItem from './AccordionItem';
import { fetchFromStrapi } from '@/lib/strapiApi';

interface StrapiFaqItem {
  id: number;
  faq_question: string;
  faq_answers: string;
  Product: string;
}

interface StrapiResponse {
  data: StrapiFaqItem[];
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// Props to allow filtering
interface FaqSectionProps {
  productName: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ productName }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const endpoint = `/api/faqs?filters[Product][$eq]=${encodeURIComponent(
          productName
        )}&sort=id:asc&pagination[limit]=10`;

        const res: StrapiResponse = await fetchFromStrapi(endpoint);

        // Map Strapi fields into FaqItem shape
        const mappedFaqs = res.data.map((item) => ({
          id: item.id,
          question: item.faq_question,
          answer: item.faq_answers,
        }));

        setFaqs(mappedFaqs);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFaqs();
  }, [productName]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.accordionContainer}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
            <div className={styles.accordion}>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: faq.answer.replace(/\n/g, "<br/>"),
                      }}
                    />
                  }
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>
            <Link
              href="/faq"
              className={styles.viewAllButton}
            >
              View all FAQs
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/faq-illustration.jpg"
              alt="Laptop displaying FAQ on its screen"
              width={500}
              height={450}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
