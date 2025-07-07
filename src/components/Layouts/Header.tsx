// src/components/Header.tsx

import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {

  return (
    // This component will be hidden on mobile via the CSS
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <nav className={styles.container}>
          <div className={styles.topNav}>
            <Link href="/individual" className={styles.topNavLinkActive}>Individual</Link>
            <Link href="/corporate" className={styles.topNavLink}>Corporate</Link>
            <Link href="/explore" className={styles.topNavLink}>Explore Boubyan Takaful</Link>
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

export default Header;