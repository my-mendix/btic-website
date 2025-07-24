// src/components/MobileHeader.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileHeader.module.css';
import { mobileMenuData } from '@/data/mobileMenuData'; 
import { FaSearch, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { // Cleanup function
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.mobileHeader}>
        <div className={styles.topBar}>
          <button onClick={toggleMenu} className={styles.iconButton} aria-label="Open menu">
            <FaBars />
          </button>
          <Link href="/" className={styles.logo}>
            <Image src="/icons/btic_icon.svg" alt="Boubyan Takaful" width={120} height={40} />
          </Link>
          <div className={styles.rightActions}>
            <button className={styles.iconButton} aria-label="Search"><FaSearch /></button>
            <Link href="/ar" className={styles.langLink}>عربي</Link>
            <button className={styles.iconButton} aria-label="Profile"><FaUser /></button>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer Menu */}
      <div className={`${styles.drawer} ${isMenuOpen ? styles.isOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <Image src="/boubyan-takaful-logo-color.png" alt="Boubyan Takaful" width={120} height={40} />
          <button onClick={toggleMenu} className={styles.iconButton} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>
        <nav className={styles.drawerNav}>
          {mobileMenuData.map((item) => (
            <div key={item.label} className={styles.navItem}>
              {item.subItems ? (
                <button className={styles.navLink} onClick={() => toggleAccordion(item.label)}>
                  <item.icon className={styles.navIcon} />
                  <span>{item.label}</span>
                  <FaChevronDown className={`${styles.chevron} ${openAccordion === item.label ? styles.chevronOpen : ''}`} />
                </button>
              ) : (
                <Link href={item.href || '#'} className={styles.navLink} onClick={toggleMenu}>
                  <item.icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </Link>
              )}
              {item.subItems && (
                <div className={`${styles.accordionContent} ${openAccordion === item.label ? styles.accordionOpen : ''}`}>
                  <ul>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link href={subItem.href} onClick={toggleMenu}>{subItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}
    </>
  );
};

export default MobileHeader;