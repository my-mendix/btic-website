// src/components/Header.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header_backup.module.css';
import { FaSearch } from 'react-icons/fa';
import MegaMenu from './MegaMenu';
import { megaMenuData } from '@/data/menuData';

const Header_backup: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top bar with secondary navigation */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <nav className={styles.topNav}>
            <Link href="/individual" className={styles.topNavLinkActive}>Individual</Link>
            <Link href="/corporate" className={styles.topNavLink}>Corporate</Link>
            <Link href="/explore" className={styles.topNavLink}>Explore Boubyan Takaful</Link>
          </nav>
          <div className={styles.topRight}>
            <Link href="/contact" className={styles.topNavLink}>Contact Us</Link>
            <Link href="/faq" className={styles.topNavLink}>FAQ</Link>
            <Link href="/careers" className={styles.topNavLink}>Careers</Link>
            <Link href="/ar" className={styles.topNavLink}>عربي</Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className={styles.mainNav}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image src="/boubyan-takaful-logo-color.png" alt="Boubyan Takaful" width={150} height={50} />
          </Link>
          <nav className={styles.mainNavLinks}>
            {/* This wrapper div is crucial for the hover effect to work correctly */}
            <div
              className={styles.navItem}
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <Link href="/products" className={styles.mainNavLinkActive}>Products</Link>
              <MegaMenu isOpen={isMenuOpen} data={megaMenuData} />
            </div>
            <Link href="/medical-network" className={styles.mainNavLink}>Medical Network</Link>
          </nav>
          <div className={styles.mainRight}>
            <button className={styles.searchButton}><FaSearch /></button>
            <Link href="/login" className={styles.loginButton}>Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header_backup;