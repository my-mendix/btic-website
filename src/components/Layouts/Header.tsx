'use client';

import React, { useState , useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { MegaMenuColumn } from '@/data/menuData';
import MegaMenu from './MegaMenu';

interface HeaderProps {
  mainMenuData: MegaMenuColumn[];
}

const Header: React.FC<HeaderProps> = ({ mainMenuData }) => {
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
                label="Individual"
                href="/products/individual"
                menuKey="individual"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
              />
              <NavItemWithMenu
                label="Corporate"
                href="/products/corporate"
                menuKey="corporate"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData}
              />
              <NavItemWithMenu
                label="About Us"
                href="/explore"
                menuKey="about"
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                megaMenuData={mainMenuData} 
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
  href: string;
  menuKey: 'individual' | 'corporate' | 'about';
  openMenu: 'individual' | 'corporate' | 'about' | null;
  setOpenMenu: React.Dispatch<React.SetStateAction<'individual' | 'corporate' | 'about' | null>>;
  megaMenuData: MegaMenuColumn[];
}

const NavItemWithMenu: React.FC<NavItemWithMenuProps> = ({
  label,
  href,
  menuKey,
  openMenu,
  setOpenMenu,
  megaMenuData,
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
        href={href}
        className={openMenu === menuKey ? styles.topNavLinkActive : styles.topNavLink}
      >
        {label}
      </Link>
      {hasMenu && <MegaMenu isOpen={openMenu === menuKey} data={filteredMegaMenuData} />}
    </div>
  );
};

export default Header;
