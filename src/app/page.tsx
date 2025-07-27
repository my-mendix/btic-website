
import React from "react";
import HeroSection from '@/components/HomepageBanner/HeroSection';
// import WhyBoubyanSection from '@/components/Miscs/WhyBoubyanSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import ProductSlider from '@/components/ProductSlider/ProductSlider';

export default async function Home() {
  
 
    
    return (
      <main>
      
      <HeroSection />
      <ProductSlider />
      <NewsSection /> 
          
    </main>
    );
  } 

