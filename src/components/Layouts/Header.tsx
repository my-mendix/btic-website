// src/components/Header.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { FaSearch } from 'react-icons/fa';
import MegaMenu from './MegaMenu';
import { MegaMenuColumn } from '@/data/menuData';


interface HeaderProps {
  megaMenuData: MegaMenuColumn[];
}

const Header: React.FC<HeaderProps> = ({ megaMenuData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <nav className={styles.container}>
          <div className={styles.topNav}>
            <Link href="/">
              <Image
                src="/icons/btic_icon.svg"
                alt="Boubyan Takaful Logo"
                width={80}
                height={40}
              />
            </Link>
            <div className={styles.navLinks}>
              {/* Wrapper for hover effect */}
              <div
                className={styles.navItem}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                {/* <Link href="/products" className={styles.navButton}>Products</Link> */}
                <Link href="/products/individual" className={styles.topNavLinkActive}>
                  Individual
                </Link>
                <MegaMenu isOpen={isMenuOpen} data={megaMenuData} />
              </div>
              <div
                className={styles.navItem}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <Link href="/products/corporate" className={styles.topNavLink}>
                  Corporate
                </Link>
                <MegaMenu isOpen={isMenuOpen} data={megaMenuData} />
              </div>
              {/* <Link href="/medical-network" className={styles.navButton}>Medical Network</Link> */}
            </div>
            <Link href="/explore" className={styles.topNavLink}>
              About Us
            </Link>
            <Link href="/medical-network" className={styles.topNavLink}>
              Medical Network
            </Link>
          </div>
          <div className={styles.topRight}>
            <Link href="/contact" className={styles.topNavLink}>
              Contact Us
            </Link>
            <Link href="/faq" className={styles.topNavLink}>
              FAQ
            </Link>
            <Link href="/careers" className={styles.topNavLink}>
              Careers
            </Link>
            <Link href="/ar" className={styles.topNavLink}>
              عربي
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
