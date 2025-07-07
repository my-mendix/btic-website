// src/data/menuData.ts

export interface MegaMenuLink {
  name: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export const megaMenuData: MegaMenuColumn[] = [
  {
    title: 'Motor',
    links: [
      { name: 'Drewilna Insurance', href: '/products/motor/drewilna' },
      { name: 'Boubyan Drive Insurance', href: '/products/motor/drive' },
      { name: 'Motor Comprehensive Insurance', href: '/products/motor/comprehensive' },
    ],
  },
  {
    title: 'Life & Medical',
    links: [
      { name: 'One-Third Alkhayrat Insurance', href: '/products/life-medical/alkhayrat' },
      { name: 'Domestic Helper Insurance', href: '/products/life-medical/domestic-helper' },
    ],
  },
  {
    title: 'Property & Casualty',
    links: [
      { name: 'Household Insurance', href: '/products/property/household' },
      { name: 'Marine TPL Insurance', href: '/products/property/marine' },
      { name: 'Medical Malpractice Insurance', href: '/products/property/medical-malpractice' },
    ],
  },
  {
    title: 'Travel',
    links: [
      { name: 'Travel Insurance', href: '/products/travel/main' },
    ],
  },
];