// src/components/home/TestimonialsSection.tsx
"use client";

import React from 'react';
import styles from './Testimonials.module.css';
import TestimonialCard from './TestimonialCard';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- Mock Data (replace with data from your API) ---
const testimonials = [
  {
    id: 1,
    iconSrc: "/icons/testimonial-icon.svg", // Place your icon in the /public folder
    text: "They've responded to the inquiries and shared a quotation very fast."
  },
  {
    id: 2,
    iconSrc: "/icons/testimonial-icon.svg",
    text: "Boubyan Takaful provides all types of insurance services. The company is excellent in its offers, especially vehicle insurance."
  },
  {
    id: 3,
    iconSrc: "/icons/testimonial-icon.svg",
    text: "Excellent service and a very professional team. The claims process was smoother than I expected."
  },
  {
    id: 4,
    iconSrc: "/icons/testimonial-icon.svg",
    text: "Their mobile app is very user-friendly, and I was able to manage my policy with ease. Highly recommended."
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className={styles.testimonialsSection}>

      <div >  
      <h3 className={styles.title}>What Boubyan Takaful Clients Say</h3>
      
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1} // Default for mobile
          loop={true}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          pagination={{
            el: `.${styles.swiperPagination}`,
            clickable: true,
          }}
          breakpoints={{
            // When window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
          }}
          className={styles.swiperInstance}
        >
          {testimonials.map(testimonial => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard 
                iconSrc={testimonial.iconSrc} 
                text={testimonial.text} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Arrows */}
        <div className={styles.swiperButtonPrev}></div>
        <div className={styles.swiperButtonNext}></div>

        {/* Custom Pagination Container */}
        <div className={styles.swiperPagination}></div>
      </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;