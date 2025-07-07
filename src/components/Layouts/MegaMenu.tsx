// src/components/MegaMenu.tsx

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css'; // We will share the header's CSS module
import { MegaMenuColumn } from '@/data/menuData'; // Import the type


interface MegaMenuProps {
  isOpen: boolean;
  data: MegaMenuColumn[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, data }) => {
  return (
    <div className={`${styles.megaMenu} ${isOpen ? styles.visible : ''}`}>
      <div className={styles.megaMenuContent}>
        {data.map((column) => (
          <div key={column.title} className={styles.megaMenuColumn}>
            <h4>{column.title}</h4>
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
    </div>
  );
};

export default MegaMenu;