'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductSlider.module.css';
import MotorPremiumCalculation from '@/components/PremiumCalculations/MotorPremiumCalculation';
import TravelPremiumCalculation from '../PremiumCalculations/TravelPremiumCalculation';
import MarinePremiumCalculation from '../PremiumCalculations/MarinePremiumCalulation';
import HouseholdPremiumCalculation from '../PremiumCalculations/HouseholdPremiumCalculation';
import DomesticPremiumCalculation from '../PremiumCalculations/DomesticPremiumCalculation';
import OtkPremiumCalculation from '../PremiumCalculations/OtkPremiumCalculation';

const images = [
  {
    src: '/images/car.jpg',
    title: 'Motor Comprehensive Insurance',
    description: 'Safeguard your vehicle with Boubyan Takaful’s comprehensive coverage against collisions, theft, and damages.',
  },
  {
    src: '/images/travel.jpg',
    title: 'Travel Insurance',
    description: 'Enjoy hassle-free travel with Boubyan Takaful’s plans, covering delays, lost passports, baggage issues, and more.',
  },
  {
    src: '/images/house.png',
    title: 'Household Insurance',
    description: 'Protect your home and belongings with our Sharia-compliant policy against fire, theft, and additional risks.',
  },
  {
    src: '/images/domestic.jpg',
    title: 'Domestic Helper Insurance',
    description: 'Boubyan Takaful’s plansSharia-compliant policy covers accidental death, disability, repatriation expenses, and more for domestic helpers.',
  },
  {
    src: '/images/otk.jpg',
    title: 'One-Third Alkhayrat Insurance',
    description: 'Benefit from personal accident coverage and charitable contributions with Boubyan Takaful’s unique solidarity plan.',
  },
  {
    src: '/images/marine.jpg',
    title: 'Marine TPL Insurance',
    description: 'Sail confidently with our marine insurance, covering boats, yachts, and jet skis against third-party liability and property damage.',
  }
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
//   const [inputValue, setInputValue] = useState('');

  const visibleSlides = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };


  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < visibleSlides; i++) {
      const image = images[(currentIndex + i) % images.length];
      slides.push({
        ...image,
        isActive: i === 0,
      });
    }
    return slides;
  };

  const activeSlide = getVisibleSlides()[0];

//   const handleCalculate = () => {
//     alert(`Calculating for "${activeSlide.title}" with input: ${inputValue}`);
//   };

  return (
    <>

      <h2 className="text-xl font-bold text-center my-6">Check Our Prices</h2>
      <div className={styles.sliderContainer}>
  
        <button className={styles.arrow} onClick={handlePrev}>&#8592;</button>
        <div className={styles.slider}>
          {getVisibleSlides().map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${image.isActive ? styles.activeSlide : ''}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className={styles.image}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className={styles.title}>{image.title}</h3>
              <p className={styles.description}>{image.description}</p>
            </div>
          ))}
        </div>
        <button className={styles.arrow} onClick={handleNext}>&#8594;</button>
      </div>

 {/* Dynamically render the premium calculation component based on the active slide */}

      {activeSlide.title.toLowerCase().includes("motor") && (
        <MotorPremiumCalculation />
      )}
      {activeSlide.title.toLowerCase().includes("travel") && (
        <TravelPremiumCalculation />
      )}
      {activeSlide.title.toLowerCase().includes("household") && (
        <HouseholdPremiumCalculation />
      )}
      {activeSlide.title.toLowerCase().includes("marine") && (
        <MarinePremiumCalculation />
      )}
      {activeSlide.title.toLowerCase().includes("domestic") && (
        <DomesticPremiumCalculation />
      )}
      {activeSlide.title.toLowerCase().includes("one") && (
        <OtkPremiumCalculation />
      )}
      

    </>
  );
};

export default ProductSlider;
