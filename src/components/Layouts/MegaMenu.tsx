// src/components/MegaMenu.tsx

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css'; // We will share the header's CSS module
import { MegaMenuColumn } from '@/data/menuData'; // Import the type


interface MegaMenuProps {
  isOpen: boolean;
  data: MegaMenuColumn[];
}


// Extend types to include id for type safety
type MegaMenuLinkWithId = {
  id?: string | number;
  name: string;
  href: string;
};
type MegaMenuColumnWithId = {
  id?: string | number;
  title: string;
  category: string;
  links: MegaMenuLinkWithId[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, data }) => {
  return (
    <div className={`${styles.megaMenu} ${isOpen ? styles.visible : ''}`}>
      <div className={styles.megaMenuContent}>
        {data.map((column: MegaMenuColumnWithId) => (
          <div key={column.id ?? column.title + column.category} className={styles.megaMenuColumn}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link: MegaMenuLinkWithId) => (
                <li key={link.id ?? link.href + link.name}>
                  <Link href={link.href} className={styles.menuBoxLink}>               
                    <div className={styles.menuBox}>                
                          {link.name}
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