// src/components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

// Import icons from the library you just installed
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube 
} from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';


// --- Data for the footer links (easy to update) ---

const footerLinkColumns = [
  {
    title: 'Individual',
    links: [
      { name: 'Products', href: '/individual/products' },
      { name: 'Medical Network', href: '/individual/medical-network' },
    ],
  },
  {
    title: 'Corporate',
    links: [
      { name: 'Products', href: '/corporate/products' },
    ],
  },
  {
    title: 'Explore Boubyan',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Boubyan Group', href: '/group' },
      { name: 'Sustainability Report', href: '/sustainability' },
      { name: 'News', href: '/news' },
      { name: 'Our Location', href: '/location' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { href: '#', icon: <FaFacebookF /> },
  { href: '#', icon: <FaXTwitter /> },
  { href: '#', icon: <FaInstagram /> },
  { href: '#', icon: <FaYoutube /> },
  { href: '#', icon: <FaWhatsapp /> },
  { href: '#', icon: <FaLinkedinIn /> },
  { href: '#', icon: <FaTiktok /> },
];

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top section: Links and Logo */}
        <div className={styles.topSection}>
          <div className={styles.linksGrid}>
            {footerLinkColumns.map((column) => (
              <div key={column.title} className={styles.linkColumn}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.logoSection}>
            <Link href="/">
              <Image
                src="/images/boubyan-takaful-logo-white.svg" // IMPORTANT: Add your white logo to the `public` folder
                alt="Boubyan Takaful Logo"
                width={180}
                height={60}
                priority
              />
            </Link>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Bottom section: App downloads and Social media */}
        <div className={styles.bottomSection}>
          <div className={styles.appDownloads}>
            <h4>DOWNLOAD OUR APP</h4>
            <div className={styles.storeButtons}>
              <Link href="#">
                <Image src="/images/google-play-badge.svg" alt="Get it on Google Play" width={135} height={40} />
              </Link>
              <Link href="#">
                <Image src="/images/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} />
              </Link>
            </div>
          </div>
          <div className={styles.socialMedia}>
            <h4>STAY CONNECTED</h4>
            <div className={styles.socialIcons}>
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} - All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;