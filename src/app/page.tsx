
import Header from '../components/Layouts/Header'
import SubHeader from '@/components/Layouts/SubHeader';
import Footer from '@/components/Layouts/Footer';
import HeroSection from '@/components/HomepageBanner/HeroSection';
// import WhyBoubyanSection from '@/components/Miscs/WhyBoubyanSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AboutBtic from '@/components/StrapiTest/AboutBtic'; 

export default function Home() {
  return (
    <main>
      <Header />
      <SubHeader />
      <HeroSection />
      <ProductSlider />
      <AboutBtic />
      {/* <WhyBoubyanSection /> */}
      <NewsSection />
      <Footer />
    </main>
  );
}

