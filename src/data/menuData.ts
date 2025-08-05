// src/data/menuData.ts

export interface MegaMenuLink {
  name: string;
  nameAr: string;
  href: string;
  hrefAr: string;
}

export interface MegaMenuColumn {
  title: string;
  category: string;
  links: MegaMenuLink[];
}
