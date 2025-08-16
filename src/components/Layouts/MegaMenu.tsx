// src/components/MegaMenu.tsx

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css'; // We will share the header's CSS module
import { MegaMenuColumn } from '@/data/menuData'; // Import the type


interface MegaMenuProps {
  isOpen: boolean;
  data: MegaMenuColumn[];
  lang: string;
  top: number;
}


const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, data, lang, top }) => {
  const isArabic = lang === 'ar';
  const menuStyle = {
    top: `${top}px`,
  };

  return (
    <div className={`${styles.megaMenu} ${isOpen ? styles.visible : ''}`} style={menuStyle} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.megaMenuContent}>
        {data.map((column) => (
          <div key={column.title + column.category} className={styles.megaMenuColumn}>
            <h4>{isArabic ? column.title_ar : column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.href + link.name}>
                  <Link href={`/${lang}${link.href}`} className={styles.menuBoxLink}>               
                    <div className={styles.menuBox}>                
                          {isArabic ? link.name_ar : link.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
