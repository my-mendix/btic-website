// src/components/SubHeader.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SubHeader.module.css';
import { FaSearch } from 'react-icons/fa';
import MegaMenu from './MegaMenu';
import { MegaMenuColumn } from '@/data/menuData';



interface SubHeaderProps {
  megaMenuData: MegaMenuColumn[];
}

const SubHeader: React.FC<SubHeaderProps> = ({ megaMenuData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  

  return (
    // This component will be hidden on mobile via the CSS
    <nav className={styles.subHeader}>
      <div className={styles.container}>
        <Link href="/">
          <Image src="/icons/btic_icon.svg" alt="Boubyan Takaful Logo" width={80} height={40} />
        </Link>
        
        <div className={styles.navLinks}>
          {/* Wrapper for hover effect */}
          <div
            className={styles.navItem}
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <Link href="/products" className={styles.navButton}>Products</Link>
            <MegaMenu isOpen={isMenuOpen} data={megaMenuData} />
          </div>
          <Link href="/medical-network" className={styles.navButton}>Medical Network</Link>
        </div>
        
        <div className={styles.spacer} />

        <div className={styles.rightActions}>
          <button className={styles.searchButton} aria-label="Search"><FaSearch /></button>
          <Link href="/login" className={styles.loginButton}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default SubHeader;
