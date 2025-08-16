import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css';

import Header from '@/components/Layouts/Header';
// import SubHeader from '@/components/Layouts/SubHeader';
import Footer from '@/components/Layouts/Footer';
import { fetchMainMenuData } from '@/lib/strapi';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boubyan Takaful.",
  description: "Boubyan Takaful - Your trusted insurance partner in Kuwait. Discover a world of financial protection and peace of mind with Boubyan Takaful. Experience comprehensive coverage tailored to your needs, backed by a commitment to excellence and customer satisfaction. Explore our range of takaful products designed to safeguard your future and secure your family's well-being. Join us in building a secure tomorrow with Boubyan Takaful.",
};


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}



export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  console.log('Language:', lang);
  const mainMenuData = await fetchMainMenuData(lang); // optionally pass lang to fetch localized menu
  // console.log('Main Menu Data:', mainMenuData);

  return (

    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header mainMenuData={mainMenuData}  lang={lang}/>
        {/* <SubHeader megaMenuData={megaMenuData} /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
