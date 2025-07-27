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
      { name: 'Drewilna Insurance', href: '/products/drewilna-insurance' },
      { name: 'Boubyan Drive Insurance', href: '/products/boubyan-drive-insurance' },
      { name: 'Motor Comprehensive Insurance', href: '/products/motor-insurance' },
    ],
  },
  {
    title: 'Life & Medical',
    links: [
      { name: 'One-Third Alkhayrat Insurance', href: '/products/alkhayrat-insurance' },
      { name: 'Domestic Helper Insurance', href: '/products/domestic-helper-insurance' },
    ],
  },
  {
    title: 'Property & Casualty',
    links: [
      { name: 'Household Insurance', href: '/products/household-insurance' },
      { name: 'Marine TPL Insurance', href: '/products/marine-insurance' },
      { name: 'Medical Malpractice Insurance', href: '/products/medical-malpractice-insurance' },
    ],
  },
  {
    title: 'Travel',
    links: [
      { name: 'Travel Insurance', href: '/products/travel-insurance' },
    ],
  },
];
