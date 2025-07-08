
import HeroSection from '@/components/HomepageBanner/HeroSection';
// import WhyBoubyanSection from '@/components/Miscs/WhyBoubyanSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AboutBtic from '@/components/StrapiTest/AboutBtic'; 

export default function Home() {
  return (
    <main>
      
      <HeroSection />
      <ProductSlider />
      <AboutBtic />
      {/* <WhyBoubyanSection /> */}
      <NewsSection />      
    </main>
  );
}

