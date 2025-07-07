// src/components/HeroSection.tsx

"use client"; // This is essential for interactive components like carousels in Next.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';

// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper's core styles and specific module styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// --- Data for the component. This makes it easy to update content later. ---

const slidesData = [
  {
    imageSrc: '/images/Banner-DW.jpg', // Replace with your image in the /public folder
    alt: 'A family enjoying a safe car ride',
    description: 'The Drewilna Policy is specifically designed for individuals who prioritize family safety and encourage responsible driving — offering peace of mind throughout every journey.',
  },
  {
    imageSrc:'/images/Banner-travel.jpg', // A different image for slide 2
    alt: 'A person looking out an airplane window',
    description: 'Travel with confidence. Our comprehensive travel insurance covers you from unexpected events, wherever you are in the world.',
  },
  {
    imageSrc:'/images/Banner-BD.jpg', // A different image for slide 3
    alt: 'Boubyan Drive Insurance',
    description: 'For the first time in Kuwait enjoy up to 20% discount on your annual premium with the all new Boubyan Drive policies.',
  },
  {
    imageSrc:'/images/Banner-marine.jpg', // A different image for slide 4
    alt: 'Marine Insurance',
    description: 'Count on us as your reliable ally at sea! Get custom marine insurance solutions to safeguard your vessel, cargo, and crew.',
  },
];

const productLinks = [
    { title: "Marine Insurance", cta: "Buy Now >", href: "/marine-insurance" },
    { title: "Domestic Helper", cta: "Buy Now >", href: "/domestic-helper-insurance" },
    { title: "Travel Insurance", cta: "Buy Now >", href: "/travel-insurance" },
    { title: "Motor Insurance", cta: "Buy Now >", href: "/motor-insurance" },
    { title: "Other Insurance", cta: "Learn More >", href: "/other-insurance" },
];


const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroWrapper}>
      {/* 1. Carousel Section */}
      <div className={styles.carouselContainer}>
        <Swiper
          // Register the modules you want to use
          modules={[Pagination, Autoplay, EffectFade]}
          // Configuration for the carousel
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // Configuration for the clickable line indicators
          pagination={{
            el: `.${styles.customPagination}`, // Link to our custom pagination div
            clickable: true,                   // Makes the indicators clickable
          }}
          className={styles.swiperInstance}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                fill // 'fill' makes the image cover the parent container
                style={{ objectFit: 'cover' }} // Ensures the image covers without distortion
                priority={index === 0} // Load the first image with high priority for better performance
              />
              <div className={styles.slideOverlay}>
                <div className={styles.descriptionBox}>
                  <p>{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* This empty div is the container Swiper will fill with clickable indicators */}
          <div className={styles.customPagination}></div>
        </Swiper>
      </div>

      {/* 2. Dark Grey Products Bar */}
      <div className={styles.productsBar}>
        {productLinks.map(product => (
            <div key={product.title} className={styles.productItem}>
                <h4>{product.title}</h4>
                <Link href={product.href}>{product.cta}</Link>
            </div>
        ))}
      </div>

      {/* 3. Light Grey Client Actions Bar */}
      <div className={styles.clientActionsBar}>
        <p>Already a Boubyan Takaful Client?</p>
        <div className={styles.actionButtons}>
            <Link href="/renew" className={styles.actionButton}>Renew</Link>
            <Link href="/make-a-claim" className={styles.actionButton}>Make a Claim</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
