'use client';

import React, { useState , useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { MegaMenuColumn } from '@/data/menuData';
import MegaMenu from './MegaMenu';

interface HeaderProps {
  mainMenuData: MegaMenuColumn[];
  lang: string;
}

const labels = {
  individual: { en: 'Individual', ar: 'الأفراد' },
  corporate: { en: 'Corporate', ar: 'الشركات' },
  about: { en: 'About Us', ar: 'عن بوبيان تكافل' },
  medicalNetwork: { en: 'Medical Network', ar: 'الشبكة الطبية' },
  contact: { en: 'Contact Us', ar: 'اتصل بنا' },
  faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  careers: { en: 'Careers', ar: 'الوظائف' },
  arabic: { en: 'عربي', ar: 'English' },
};

const Header: React.FC<HeaderProps> = ({ mainMenuData ,lang}  ) => {
  const [openMenu, setOpenMenu] = useState<'individual' | 'corporate' | 'about' | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = React.useRef<HTMLElement>(null);
  const pathname = usePathname();

  const getLabel = (key: keyof typeof labels) => labels[key][lang as keyof typeof labels[keyof typeof labels]];
  const getLanguageSwitchUrl = () => {
    const currentLang = pathname.split('/')[1];
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    return pathname.replace(currentLang, newLang);
  };

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.topBar}>
        <nav className={styles.container}>
          <div className={styles.topNav}>
            <Link href={`/${lang}`}>
              <Image
                src="/icons/btic_icon.svg" 
                alt="Boubyan Takaful Logo"
                width={80}
                height={40}
                priority
                unoptimized
              />
            </Link>

            {/* <div className={styles.navLinks}> */}
              <NavItemWithMenu
                label={getLabel('individual')}
                href={`/${lang}/products/individual`}
                menuKey="individual"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
                lang={lang}
                headerHeight={headerHeight}
              />
              <NavItemWithMenu
                label={getLabel('corporate')}
                href={`/${lang}/products/corporate`}
                menuKey="corporate"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
                lang={lang}
                headerHeight={headerHeight}
              />
              <NavItemWithMenu
                label={getLabel('about')}
                href={`/${lang}/explore`}
                menuKey="about"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
                lang={lang}
                headerHeight={headerHeight}
              />
              <Link href={`/${lang}/medical-network`} className={styles.topNavLink}>{getLabel('medicalNetwork')}</Link>

            {/* </div> */}

            <div className={styles.topNavExtras}>
              
            </div>
          </div>

          <div className={styles.topRight}>
            <Link href={`/${lang}/contact`} className={styles.topNavLink}>{getLabel('contact')}</Link>
            <Link href={`/${lang}/faq`} className={styles.topNavLink}>{getLabel('faq')}</Link>
            <Link href={`/${lang}/careers`} className={styles.topNavLink}>{getLabel('careers')}</Link>
            <Link href={getLanguageSwitchUrl()} className={styles.topNavLink}>{getLabel('arabic')}</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

interface NavItemWithMenuProps {
  label: string;
  href: string;
  menuKey: 'individual' | 'corporate' | 'about';
  openMenu: 'individual' | 'corporate' | 'about' | null;
  setOpenMenu: React.Dispatch<React.SetStateAction<'individual' | 'corporate' | 'about' | null>>;
  megaMenuData: MegaMenuColumn[];
  lang: string;
  headerHeight: number;
}

const NavItemWithMenu: React.FC<NavItemWithMenuProps> = ({
  label,
  href,
  menuKey,
  openMenu,
  setOpenMenu,
  megaMenuData,
  lang,
  headerHeight,
}) => {
  const hasMenu = megaMenuData.length > 0;
  const englishLabel = labels[menuKey]['en'];
  const filteredMegaMenuData = megaMenuData.filter((item: MegaMenuColumn) => item.category === englishLabel);
  return (
    <div
      className={styles.navItem}
      onMouseEnter={() => hasMenu && setOpenMenu(menuKey)}
      onMouseLeave={() => hasMenu && setOpenMenu(null)}
    >
      <Link
        href={ href}
        className={openMenu === menuKey ? styles.topNavLinkActive : styles.topNavLink}
      >
        {label}
      </Link>
      
      {hasMenu && <MegaMenu isOpen={openMenu === menuKey} data={filteredMegaMenuData} lang={lang} top={headerHeight} />}
    </div>
  );
};

export default Header;
