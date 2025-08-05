'use client';

import React, { useState , useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { MegaMenuColumn } from '@/data/menuData';
import MegaMenu from './MegaMenu';

interface HeaderProps {
  mainMenuData: MegaMenuColumn[];
  lang: string;
}

const Header: React.FC<HeaderProps> = ({ mainMenuData ,lang}  ) => {
  const [openMenu, setOpenMenu] = useState<'individual' | 'corporate' | 'about' | null>(null);
  
useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <nav className={styles.container}>
          <div className={styles.topNav}>
            <Link href="/">
              <Image
                src="/images/icons/btic_icon.svg" 
                alt="Boubyan Takaful Logo"
                width={80}
                height={40}
                priority
                unoptimized
              />
            </Link>

            {/* <div className={styles.navLinks}> */}
              <NavItemWithMenu
                label="Individual"
                labelAr="الأفراد"
                href="/products/individual"
                menuKey="individual"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
                lang = {lang}
              />
              <NavItemWithMenu
                label="Corporate"
                labelAr="الشركات"
                href="/products/corporate"
                menuKey="corporate"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
                lang = {lang}
              />
              <NavItemWithMenu
                label="About Us"
                labelAr="عن بوبيان تكافل"
                href="/explore"
                menuKey="about"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData} 
                lang = {lang}
              />
              <Link href="/medical-network" className={styles.topNavLink}>Medical Network</Link>

            {/* </div> */}

            <div className={styles.topNavExtras}>
              
            </div>
          </div>

          <div className={styles.topRight}>
            <Link href="/contact" className={styles.topNavLink}>Contact Us</Link>
            <Link href="/faq" className={styles.topNavLink}>FAQ</Link>
            <Link href="/careers" className={styles.topNavLink}>Careers</Link>
            <Link href="/ar" className={styles.topNavLink}>عربي</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

interface NavItemWithMenuProps {
  label: string;
  labelAr: string;
  href: string;
  menuKey: 'individual' | 'corporate' | 'about';
  openMenu: 'individual' | 'corporate' | 'about' | null;
  setOpenMenu: React.Dispatch<React.SetStateAction<'individual' | 'corporate' | 'about' | null>>;
  megaMenuData: MegaMenuColumn[];
  lang: string;
}

const NavItemWithMenu: React.FC<NavItemWithMenuProps> = ({
  label,
  labelAr,
  href,
  menuKey,
  openMenu,
  setOpenMenu,
  megaMenuData,
  lang,
}) => {
  const hasMenu = megaMenuData.length > 0;
  const filteredMegaMenuData = megaMenuData.filter((item: MegaMenuColumn) => item.category === label);
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
              <div>
        {lang === 'ar' ? labelAr : label}
      </div>
      </Link>
      
      {hasMenu && <MegaMenu isOpen={openMenu === menuKey} data={filteredMegaMenuData} />}
    </div>
  );
};

export default Header;
